import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { getJestSelectors } from '@volkovlabs/jest-selectors';
import React from 'react';

import {
  SUNBURST_DEFAULT,
  SunburstEmphasisFocusOption,
  SunburstLabelRotate,
  SunburstSortOption,
  TEST_IDS,
} from '../../constants';
import { SeriesType } from '../../types';
import { SeriesEditor } from './SeriesEditor';

/**
 * Properties
 */
type Props = React.ComponentProps<typeof SeriesEditor>;

/**
 * Series Editor
 */
describe('Series Editor', () => {
  /**
   * Create On Change Handler
   */
  const createOnChangeHandler = (initialValue: any) => {
    let value = initialValue;
    return {
      value,
      onChange: jest.fn((newValue) => {
        value = newValue;
      }),
    };
  };

  /**
   * Dataset
   */
  const dataset = [
    {
      name: 'Value',
      source: 'A',
    },
    {
      name: 'Time',
      source: 'A',
    },
  ];

  /**
   * Selectors
   */
  const getSelectors = getJestSelectors(TEST_IDS.seriesEditor);
  const selectors = getSelectors(screen);

  /**
   * Get Tested Component
   */
  const getComponent = (props: Partial<Props>) => {
    return <SeriesEditor dataset={dataset} value={[]} {...(props as any)} />;
  };

  /**
   * Open Item
   * @param name
   */
  const openItem = (name: string) => {
    /**
     * Check item presence
     */
    expect(screen.getByText(name)).toBeInTheDocument();

    /**
     * Make Item is opened
     */
    fireEvent.click(screen.getByText(name));
  };

  it('Should render component', () => {
    render(getComponent({}));

    expect(selectors.root()).toBeInTheDocument();
  });

  it('Should render items', () => {
    render(
      getComponent({
        value: [
          {
            uid: 'line',
            id: 'line',
            name: 'Line',
            type: SeriesType.LINE,
            encode: {
              x: ['A:Time'],
              y: ['A:Value'],
            },
          },
          {
            uid: 'line2',
            id: 'line2',
            name: 'Line 2',
            type: SeriesType.LINE,
            encode: {
              x: ['A:Time'],
              y: ['A:Value'],
            },
          },
        ],
      })
    );

    expect(selectors.root()).toBeInTheDocument();
    expect(screen.getByText('Line [line]')).toBeInTheDocument();
    expect(screen.getByText('Line 2 [line2]')).toBeInTheDocument();
  });

  it('Should remove item', () => {
    const { value, onChange } = createOnChangeHandler([
      {
        uid: 'line',
        id: 'line',
        name: 'Line',
        type: SeriesType.LINE,
        encode: {
          x: ['A:Time'],
          y: ['A:Value'],
        },
      },
    ]);

    const { rerender } = render(
      getComponent({
        value,
        onChange,
      })
    );

    expect(selectors.root()).toBeInTheDocument();
    expect(screen.getByText('Line [line]')).toBeInTheDocument();
    const removeButtons = screen.getAllByTestId(TEST_IDS.seriesEditor.buttonRemove);

    fireEvent.click(removeButtons[0]);

    rerender(
      getComponent({
        value,
        onChange,
      })
    );

    expect(screen.queryByText('Line [line]')).not.toBeInTheDocument();
  });

  describe('Add new item', () => {
    it('Should add new item', async () => {
      const { value, onChange } = createOnChangeHandler([
        {
          uid: 'line',
          id: 'line',
          name: 'Line',
          type: SeriesType.LINE,
          encode: {
            x: ['A:Time'],
            y: ['A:Value'],
          },
        },
      ]);

      const { rerender } = render(
        getComponent({
          value,
          onChange,
        })
      );

      await act(async () => fireEvent.change(selectors.newItemId(), { target: { value: 'line2' } }));

      expect(selectors.buttonAddNew()).not.toBeDisabled();

      await act(async () => {
        fireEvent.click(selectors.buttonAddNew());
      });

      rerender(
        getComponent({
          value,
          onChange,
        })
      );

      expect(screen.getByText(' [line2]')).toBeInTheDocument();

      /**
       * Should clean new item id field
       */
      expect(selectors.newItemId()).toHaveValue('');
    });

    it('Should not allow add item with the same id', async () => {
      const { value, onChange } = createOnChangeHandler([
        {
          uid: 'line',
          id: 'line',
          name: 'Line',
          type: SeriesType.LINE,
          encode: {
            x: ['A:Time'],
            y: ['A:Value'],
          },
        },
      ]);

      render(
        getComponent({
          value,
          onChange,
        })
      );

      await act(async () => fireEvent.change(selectors.newItemId(), { target: { value: 'line' } }));

      expect(selectors.buttonAddNew()).toBeDisabled();
    });
  });

  /**
   * Items order
   */
  describe('Items order', () => {
    it('Should reorder items', async () => {
      let onDragEndHandler: (result: DropResult) => void = () => null;
      jest.mocked(DragDropContext).mockImplementation(({ children, onDragEnd }: any) => {
        onDragEndHandler = onDragEnd;
        return children;
      });

      const { value, onChange } = createOnChangeHandler([
        {
          uid: 'line',
          id: 'line',
          name: 'Line',
          type: SeriesType.LINE,
          encode: {
            x: ['A:Time'],
            y: ['A:Value'],
          },
        },
        {
          uid: 'line2',
          id: 'line2',
          name: 'Line',
          type: SeriesType.LINE,
          encode: {
            x: ['A:Time'],
            y: ['A:Value'],
          },
        },
      ]);

      const { rerender } = render(getComponent({ value, onChange }));

      /**
       * Simulate drop element 1 to index 0
       */
      await act(async () =>
        onDragEndHandler({
          destination: {
            index: 0,
          },
          source: {
            index: 1,
          },
        } as any)
      );

      rerender(getComponent({ value, onChange }));

      /**
       * Check if items order is changed
       */
      const items = screen.getAllByTestId('draggable');
      expect(within(items[0]).getByText('Line [line2]')).toBeInTheDocument();
      expect(within(items[1]).getByText('Line [line]')).toBeInTheDocument();
    });

    it('Should not reorder items if drop outside the list', async () => {
      let onDragEndHandler: (result: DropResult) => void = () => null;
      jest.mocked(DragDropContext).mockImplementation(({ children, onDragEnd }: any) => {
        onDragEndHandler = onDragEnd;
        return children;
      });

      const { value, onChange } = createOnChangeHandler([
        {
          uid: 'line',
          id: 'line',
          name: 'Line',
          type: SeriesType.LINE,
          encode: {
            x: ['A:Time'],
            y: ['A:Value'],
          },
        },
        {
          uid: 'line2',
          id: 'line2',
          name: 'Line',
          type: SeriesType.LINE,
          encode: {
            x: ['A:Time'],
            y: ['A:Value'],
          },
        },
      ]);

      render(getComponent({ value, onChange }));

      /**
       * Simulate drop element 1 to index 0
       */
      await act(async () =>
        onDragEndHandler({
          destination: null,
          source: {
            index: 1,
          },
        } as any)
      );

      /**
       * Check if items order is not changed
       */
      const items = screen.getAllByTestId('draggable');
      expect(within(items[0]).getByText('Line [line]')).toBeInTheDocument();
      expect(within(items[1]).getByText('Line [line2]')).toBeInTheDocument();
    });
  });

  describe('Item updates', () => {
    const lineItem = {
      uid: 'line',
      id: 'line',
      name: 'Line',
      type: SeriesType.LINE,
      encode: {
        x: ['A:Time'],
        y: ['A:Value'],
      },
    };
    const items = [
      lineItem,
      {
        uid: 'other',
        id: 'other',
        name: 'Other',
      },
    ];

    it('Should update id', () => {
      const { value, onChange } = createOnChangeHandler(items);

      const { rerender } = render(
        getComponent({
          value,
          onChange,
        })
      );

      openItem('Line [line]');

      fireEvent.change(screen.getByLabelText('ID'), { target: { value: 'line123' } });

      rerender(
        getComponent({
          value,
          onChange,
        })
      );

      expect(screen.getByText('Line [line123]')).toBeInTheDocument();
    });

    it('Should update type', () => {
      const { value, onChange } = createOnChangeHandler(items);

      const { rerender } = render(
        getComponent({
          value,
          onChange,
        })
      );

      openItem('Line [line]');

      fireEvent.change(screen.getByLabelText('Type'), { target: { value: SeriesType.PIE } });

      rerender(
        getComponent({
          value,
          onChange,
        })
      );

      expect(screen.getByLabelText('Type')).toHaveValue(SeriesType.PIE);
    });

    it('Should update name', () => {
      const { value, onChange } = createOnChangeHandler(items);

      const { rerender } = render(
        getComponent({
          value,
          onChange,
        })
      );

      openItem('Line [line]');

      fireEvent.change(screen.getByLabelText('Name'), { target: { value: '123' } });

      rerender(
        getComponent({
          value,
          onChange,
        })
      );

      expect(screen.getByLabelText('Name')).toHaveValue('123');
    });

    describe('Line', () => {
      it('Should update encode Y', () => {
        const { value, onChange } = createOnChangeHandler(items);

        const { rerender } = render(
          getComponent({
            value,
            onChange,
            dataset,
          })
        );

        openItem('Line [line]');

        fireEvent.change(screen.getByLabelText('Encode Y'), { target: { values: ['A:Value'] } });

        rerender(
          getComponent({
            value,
            onChange,
          })
        );

        expect(screen.getByLabelText('Encode Y')).toHaveValue(['A:Value']);
      });

      it('Should update encode X', () => {
        const { value, onChange } = createOnChangeHandler(items);

        const { rerender } = render(
          getComponent({
            value,
            onChange,
            dataset,
          })
        );

        openItem('Line [line]');

        fireEvent.change(screen.getByLabelText('Encode X'), { target: { values: ['A:Value'] } });

        rerender(
          getComponent({
            value,
            onChange,
          })
        );

        expect(screen.getByLabelText('Encode X')).toHaveValue(['A:Value']);
      });
    });

    describe('Bar', () => {
      const barItem = {
        uid: 'bar',
        id: 'bar',
        name: 'BAR',
        type: SeriesType.BAR,
        encode: {
          x: ['A:Time'],
          y: ['A:Value'],
        },
      };
      const items = [
        barItem,
        {
          uid: 'other',
          id: 'other',
          name: 'Other',
        },
      ];

      it('Should update encode Y', () => {
        const { value, onChange } = createOnChangeHandler(items);

        const { rerender } = render(
          getComponent({
            value,
            onChange,
            dataset,
          })
        );

        openItem('BAR [bar]');

        fireEvent.change(screen.getByLabelText('Encode Y'), { target: { values: ['A:Value'] } });

        rerender(
          getComponent({
            value,
            onChange,
          })
        );

        expect(screen.getByLabelText('Encode Y')).toHaveValue(['A:Value']);
      });

      it('Should update encode X', () => {
        const { value, onChange } = createOnChangeHandler(items);

        const { rerender } = render(
          getComponent({
            value,
            onChange,
            dataset,
          })
        );

        openItem('BAR [bar]');

        fireEvent.change(screen.getByLabelText('Encode X'), { target: { values: ['A:Value'] } });

        rerender(
          getComponent({
            value,
            onChange,
          })
        );

        expect(screen.getByLabelText('Encode X')).toHaveValue(['A:Value']);
      });
    });

    describe('Boxplot', () => {
      const boxplot = {
        uid: 'box-1',
        id: 'box-1',
        name: 'box-1-1',
        type: SeriesType.BOXPLOT,
        encode: {
          x: ['A:Time'],
          y: ['A:Value'],
        },
      };
      const items = [
        boxplot,
        {
          uid: 'other',
          id: 'other',
          name: 'Other',
        },
      ];

      it('Should update encode Y', () => {
        const { value, onChange } = createOnChangeHandler(items);

        const { rerender } = render(
          getComponent({
            value,
            onChange,
            dataset,
          })
        );

        openItem('box-1-1 [box-1]');

        fireEvent.change(screen.getByLabelText('Encode Y'), { target: { values: ['A:Value'] } });

        rerender(
          getComponent({
            value,
            onChange,
          })
        );

        expect(screen.getByLabelText('Encode Y')).toHaveValue(['A:Value']);
      });

      it('Should update encode X', () => {
        const { value, onChange } = createOnChangeHandler(items);

        const { rerender } = render(
          getComponent({
            value,
            onChange,
            dataset,
          })
        );

        openItem('box-1-1 [box-1]');

        fireEvent.change(screen.getByLabelText('Encode X'), { target: { values: ['A:Value'] } });

        rerender(
          getComponent({
            value,
            onChange,
          })
        );

        expect(screen.getByLabelText('Encode X')).toHaveValue(['A:Value']);
      });
    });

    describe('Scatter', () => {
      const scatter = {
        uid: 'scatter-1',
        id: 'scatter-1',
        name: 'scatter-1-1',
        type: SeriesType.SCATTER,
        encode: {
          x: ['A:Time'],
          y: ['A:Value'],
        },
      };
      const items = [
        scatter,
        {
          uid: 'other',
          id: 'other',
          name: 'Other',
        },
      ];

      it('Should update encode Y', () => {
        const { value, onChange } = createOnChangeHandler(items);

        const { rerender } = render(
          getComponent({
            value,
            onChange,
            dataset,
          })
        );

        openItem('scatter-1-1 [scatter-1]');

        fireEvent.change(screen.getByLabelText('Encode Y'), { target: { values: ['A:Value'] } });

        rerender(
          getComponent({
            value,
            onChange,
          })
        );

        expect(screen.getByLabelText('Encode Y')).toHaveValue(['A:Value']);
      });

      it('Should update encode X', () => {
        const { value, onChange } = createOnChangeHandler(items);

        const { rerender } = render(
          getComponent({
            value,
            onChange,
            dataset,
          })
        );

        openItem('scatter-1-1 [scatter-1]');

        fireEvent.change(screen.getByLabelText('Encode X'), { target: { values: ['A:Value'] } });

        rerender(
          getComponent({
            value,
            onChange,
          })
        );

        expect(screen.getByLabelText('Encode X')).toHaveValue(['A:Value']);
      });

      it('Should update field size', () => {
        const { value, onChange } = createOnChangeHandler(items);

        const { rerender } = render(
          getComponent({
            value,
            onChange,
            dataset,
          })
        );

        openItem('scatter-1-1 [scatter-1]');

        fireEvent.change(screen.getByLabelText('Size'), { target: { value: 'A:Value' } });

        rerender(
          getComponent({
            value,
            onChange,
          })
        );

        expect(screen.getByLabelText('Size')).toHaveValue('A:Value');
      });

      it('Should update symbol type', () => {
        const { value, onChange } = createOnChangeHandler(items);

        const { rerender } = render(
          getComponent({
            value,
            onChange,
            dataset,
          })
        );

        openItem('scatter-1-1 [scatter-1]');

        expect(screen.getByLabelText('Symbol Type')).toHaveValue('circle');

        fireEvent.change(screen.getByLabelText('Symbol Type'), { target: { value: 'triangle' } });

        rerender(
          getComponent({
            value,
            onChange,
          })
        );

        expect(screen.getByLabelText('Symbol Type')).toHaveValue('triangle');
      });

      it('Should update encode tooltip', () => {
        const { value, onChange } = createOnChangeHandler(items);

        const { rerender } = render(
          getComponent({
            value,
            onChange,
            dataset,
          })
        );

        openItem('scatter-1-1 [scatter-1]');

        expect(screen.getByLabelText('Tooltip')).toHaveValue(['']);

        fireEvent.change(screen.getByLabelText('Tooltip'), { target: { values: ['A:Value'] } });

        rerender(
          getComponent({
            value,
            onChange,
          })
        );

        expect(screen.getByLabelText('Tooltip')).toHaveValue(['A:Value']);
      });
    });

    describe('Sunburst', () => {
      const sunburstItem = {
        ...SUNBURST_DEFAULT,
        uid: 'sunburst',
        id: 'sunburst',
        name: 'Sunburst',
        type: SeriesType.SUNBURST,
        groups: [
          {
            name: 'Level 0',
            source: 'A',
            value: 'A:Level 0',
          },
          {
            name: 'Level 1',
            source: 'A',
            value: 'A:Level 1',
          },
          {
            name: 'Level 2',
            source: 'A',
            value: 'A:Level 2',
          },
        ],
      };
      const items = [
        sunburstItem,
        {
          uid: 'other',
          id: 'other',
          name: 'Other',
        },
      ];
      const dataSetSunburst = [
        {
          name: 'Level 0',
          source: 'A',
        },
        {
          name: 'Level 1',
          source: 'A',
        },
        {
          name: 'Level 2',
          source: 'A',
        },
        {
          name: 'Level 3',
          source: 'A',
        },
        {
          name: 'Level 4',
          source: 'A',
        },
      ] as any;

      it('Should render sunburst editor', () => {
        const { value, onChange } = createOnChangeHandler(items);

        render(
          getComponent({
            value,
            onChange,
            dataset: dataSetSunburst,
          })
        );

        openItem('Sunburst [sunburst]');

        expect(screen.getByLabelText('Level value')).toBeInTheDocument();
      });

      it('Should change value level', async () => {
        const { value, onChange } = createOnChangeHandler(items);

        const { rerender } = render(
          getComponent({
            value,
            onChange,
            dataset: dataSetSunburst,
          })
        );

        openItem('Sunburst [sunburst]');

        expect(screen.getByLabelText('Level value')).toBeInTheDocument();
        expect(screen.getByLabelText('Level value')).toHaveValue('1');

        fireEvent.change(screen.getByLabelText('Level value'), { target: { value: 10 } });

        rerender(
          getComponent({
            value,
            onChange,
          })
        );

        expect(screen.getByLabelText('Level value')).toHaveValue('10');
      });

      it('Should change inner radius', async () => {
        const { value, onChange } = createOnChangeHandler(items);

        const { rerender } = render(
          getComponent({
            value,
            onChange,
            dataset: dataSetSunburst,
          })
        );

        openItem('Sunburst [sunburst]');

        expect(screen.getByLabelText('Inner Radius')).toBeInTheDocument();
        expect(screen.getByLabelText('Inner Radius')).toHaveValue('0');

        fireEvent.change(screen.getByLabelText('Inner Radius'), { target: { value: 10 } });

        rerender(
          getComponent({
            value,
            onChange,
          })
        );

        expect(screen.getByLabelText('Inner Radius')).toHaveValue('10');
      });

      it('Should change outer radius', async () => {
        const { value, onChange } = createOnChangeHandler(items);

        const { rerender } = render(
          getComponent({
            value,
            onChange,
            dataset: dataSetSunburst,
          })
        );

        openItem('Sunburst [sunburst]');

        expect(screen.getByLabelText('Outer Radius')).toBeInTheDocument();
        expect(screen.getByLabelText('Outer Radius')).toHaveValue('100%');

        fireEvent.change(screen.getByLabelText('Outer Radius'), { target: { value: 10 } });

        rerender(
          getComponent({
            value,
            onChange,
          })
        );

        expect(screen.getByLabelText('Outer Radius')).toHaveValue('10');
      });

      it('Should add New Level', async () => {
        const { value, onChange } = createOnChangeHandler(items);

        const { rerender } = render(
          getComponent({
            value,
            onChange,
            dataset: dataSetSunburst,
          })
        );

        openItem('Sunburst [sunburst]');

        expect(screen.getByTestId(TEST_IDS.seriesEditor.sunburstNewLevelButtonAddNew)).toBeInTheDocument();
        expect(screen.getByTestId(TEST_IDS.seriesEditor.sunburstNewLevelName)).toBeInTheDocument();
        expect(screen.getByTestId(TEST_IDS.seriesEditor.sunburstNewLevelButtonAddNew)).toBeDisabled();

        fireEvent.change(screen.getByTestId(TEST_IDS.seriesEditor.sunburstNewLevelName), { target: { value: 'A:Level 3' } });

        expect(screen.getByTestId(TEST_IDS.seriesEditor.sunburstNewLevelButtonAddNew)).not.toBeDisabled();

        await act(async () => {
          fireEvent.click(screen.getByTestId(TEST_IDS.seriesEditor.sunburstNewLevelButtonAddNew));
        });

        /**
         * Rerender
         */
        rerender(
          getComponent({
            value,
            onChange,
            dataset: dataSetSunburst,
          })
        );

        expect(screen.getByTestId(TEST_IDS.seriesEditor.sunburstNewLevelButtonAddNew)).toBeDisabled();

        expect(screen.getByTestId(TEST_IDS.seriesEditor.sunburstLevelItem(false, 'Level 3'))).toBeInTheDocument();
      });

      it('Should remove Level', async () => {
        const { value, onChange } = createOnChangeHandler(items);

        render(
          getComponent({
            value,
            onChange,
            dataset: dataSetSunburst,
          })
        );

        openItem('Sunburst [sunburst]');
        const removeButtons = screen.getAllByTestId(TEST_IDS.seriesEditor.sunburstLevelItemRemoveButton);

        /**
         * Remove
         */
        await act(() =>
          fireEvent.click(removeButtons[2])
        );

        expect(onChange).toHaveBeenCalledWith([
          {
            emphasis: { focus: 'none' },
            groups: [
              { name: 'Level 0', source: 'A', value: 'A:Level 0' },
              { name: 'Level 1', source: 'A', value: 'A:Level 1' },
              { name: 'Level 3', source: 'A', value: 'A:Level 3' },
            ],
            id: 'sunburst',
            innerRadius: '0',
            label: { rotate: 'radial', show: true },
            levelValue: '1',
            name: 'Sunburst',
            outerRadius: '100%',
            sort: 'desc',
            type: 'sunburst',
            uid: 'sunburst',
          },
          { id: 'other', name: 'Other', uid: 'other' },
        ]);
      });

      it('Should not reorder items if drop outside the list', async () => {
        let onDragEndHandler: (result: DropResult) => void = () => {};
        jest.mocked(DragDropContext).mockImplementation(({ children, onDragEnd }: any) => {
          onDragEndHandler = onDragEnd;
          return children;
        });

        const { value, onChange } = createOnChangeHandler(items);

        render(
          getComponent({
            value,
            onChange,
            dataset: dataSetSunburst,
          })
        );

        openItem('Sunburst [sunburst]');
        const field2 = screen.getByText('Level 2');

        expect(field2).toBeInTheDocument();

        /**
         * Simulate drop element 1 to index 0
         */
        await act(async () =>
          onDragEndHandler({
            destination: null,
            source: {
              index: 1,
            },
          } as any)
        );

        expect(onChange).not.toHaveBeenCalledWith([]);
      });

      it('Should reorder items', async () => {
        let onDragEndHandler: (result: DropResult) => void = () => {};
        jest.mocked(DragDropContext).mockImplementation(({ children, onDragEnd }: any) => {
          onDragEndHandler = onDragEnd;
          return children;
        });

        const { value, onChange } = createOnChangeHandler(items);

        render(
          getComponent({
            value,
            onChange,
            dataset: dataSetSunburst,
          })
        );

        openItem('Sunburst [sunburst]');
        const field2 = screen.getByText('Level 2');

        expect(field2).toBeInTheDocument();

        /**
         * Simulate drop element 1 to outside
         */
        await act(async () =>
          onDragEndHandler({
            destination: {
              index: 0,
            },
            source: {
              index: 1,
            },
          } as any)
        );

        expect(onChange).toHaveBeenCalledWith([
          {
            emphasis: {
              focus: 'none',
            },
            groups: [
              { name: 'Level 1', source: 'A', value: 'A:Level 1' },
              {
                name: 'Level 0',
                source: 'A',
                value: 'A:Level 0',
              },
              {
                name: 'Level 2',
                source: 'A',
                value: 'A:Level 2',
              },
              {
                name: 'Level 3',
                source: 'A',
                value: 'A:Level 3',
              },
            ],
            id: 'sunburst',
            innerRadius: '0',
            label: {
              rotate: 'radial',
              show: true,
            },
            levelValue: '1',
            name: 'Sunburst',
            outerRadius: '100%',
            sort: 'desc',
            type: 'sunburst',
            uid: 'sunburst',
          },
          {
            id: 'other',
            name: 'Other',
            uid: 'other',
          },
        ]);
      });

      it('Should change sort', async () => {
        const { value, onChange } = createOnChangeHandler(items);

        render(
          getComponent({
            value,
            onChange,
            dataset: dataSetSunburst,
          })
        );

        openItem('Sunburst [sunburst]');

        const radiusField = screen.getByLabelText(SunburstSortOption.DESC);
        expect(radiusField).toBeInTheDocument();

        expect(screen.getByLabelText(SunburstSortOption.DESC)).toBeChecked();

        /**
         * Change target
         */
        await act(() => fireEvent.click(screen.getByLabelText(SunburstSortOption.ASC)));

        expect(screen.getByLabelText(SunburstSortOption.ASC)).toHaveValue(SunburstSortOption.ASC);
      });

      it('Should Emphasis Focus', async () => {
        const { value, onChange } = createOnChangeHandler(items);

        render(
          getComponent({
            value,
            onChange,
            dataset: dataSetSunburst,
          })
        );

        openItem('Sunburst [sunburst]');

        expect(item.emphasisFocusOption(false, SunburstEmphasisFocusOption.NONE)).toBeChecked();

        /**
         * Change target
         */
        await act(() => fireEvent.click(item.emphasisFocusOption(false, SunburstEmphasisFocusOption.ANCESTOR)));

        expect(item.emphasisFocusOption(false, SunburstEmphasisFocusOption.ANCESTOR)).toBeChecked();
      });

      it('Should change Show Label', async () => {
        const { value, onChange } = createOnChangeHandler(items);

        render(
          getComponent({
            value,
            onChange,
            dataset: dataSetSunburst,
          })
        );

        openItem(sunburstItem.id);

        const showLabelField = item.sunburstShowLabel();

        expect(showLabelField).toBeInTheDocument();
        expect(item.showLabelOption(false, true)).toBeChecked();

        /**
         * Change target
         */
        await act(() => fireEvent.click(item.showLabelOption(false, false)));

        expect(item.showLabelOption(false, false)).toBeChecked();
      });

      it('Should change rotate option Label', async () => {
        const { value, onChange } = createOnChangeHandler(items);

        render(
          getComponent({
            value,
            onChange,
            dataset: dataSetSunburst,
          })
        );

        openItem(sunburstItem.id);

        const rotateField = item.sunburstLabelRotate();

        expect(rotateField).toBeInTheDocument();
        expect(item.labelRotateOption(false, SunburstLabelRotate.RADIAL)).toBeChecked();

        /**
         * Change target
         */
        await act(() => fireEvent.click(item.labelRotateOption(false, SunburstLabelRotate.TANGENTIAL)));

        expect(item.labelRotateOption(false, SunburstLabelRotate.TANGENTIAL)).toBeChecked();
      });
    });

    /**
     * Cover 100% test for series item editor
     */
    describe('Default', () => {
      const defaultItem = {
        uid: 'default',
        id: 'default',
        name: 'Default',
        type: 'Other',
      };
      const items = [
        defaultItem,
        {
          uid: 'other',
          id: 'other',
          name: 'Other',
        },
      ];

      it('Should render editor', () => {
        const { value, onChange } = createOnChangeHandler(items);

        render(
          getComponent({
            value,
            onChange,
            dataset,
          })
        );

        openItem('Default [default]');

        expect(screen.getByLabelText('ID')).toBeInTheDocument();
        expect(screen.getByLabelText('ID')).toHaveValue('default');
      });
    });

    describe('Radar', () => {
      const radarItem = {
        uid: 'radar',
        id: 'radar',
        name: 'Radar',
        type: SeriesType.RADAR,
        radarDimensions: [
          {
            name: 'Test',
            uid: 'Dimension-Test',
            value: 'A:Value',
          },
        ],
      };
      const radarItems = [
        radarItem,
        {
          uid: 'other',
          id: 'other',
          name: 'Other',
        },
      ];

      it('Should add new dimension', async () => {
        const { value, onChange } = createOnChangeHandler(radarItems);

        const { rerender } = render(
          getComponent({
            value,
            onChange,
          })
        );

        openItem('Radar [radar]');

        /**
         * Initial state
         */
        expect(screen.getByRole('button', { name: 'Add new Radar item' })).toBeInTheDocument();
        expect(screen.getByLabelText('New Dimension')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Add new Radar item' })).toBeDisabled();

        await act(async() => {
          fireEvent.change(screen.getByLabelText('New Dimension'), { target: { value: 'Test-2' } });
        });

        expect(screen.getByRole('button', { name: 'Add new Radar item' })).not.toBeDisabled();

        await act(async () => {
          fireEvent.click(screen.getByRole('button', { name: 'Add new Radar item' }));
        });

        /**
         * Rerender
         */
        rerender(
          getComponent({
            value,
            onChange,
          })
        );

        /**
         * Should add new dimension for radar
         */
        expect(screen.getByLabelText('Dimension Name')).toHaveValue('Test-2');

        /**
         * Should clean new item id field
         */
        expect(screen.getByLabelText('New Dimension')).toHaveValue('');
      });

      it('Should add new dimension if initial dimensions is empty', async () => {
        const radarItem = {
          uid: 'radar',
          id: 'radar',
          name: 'Radar',
          type: SeriesType.RADAR,
        };
        const radarItems = [
          radarItem,
          {
            uid: 'other',
            id: 'other',
            name: 'Other',
          },
        ];

        const { value, onChange } = createOnChangeHandler(radarItems);

        const { rerender } = render(
          getComponent({
            value,
            onChange,
          })
        );

        openItem(radarItem.id);

        /**
         * Initial state
         */
        expect(item.radarDimensionButtonAddNew()).toBeInTheDocument();
        expect(item.radarDimensionNewItemId()).toBeInTheDocument();
        expect(item.radarDimensionButtonAddNew()).toBeDisabled();

        fireEvent.change(item.radarDimensionNewItemId(), { target: { value: 'Test-2' } });

        expect(item.radarDimensionButtonAddNew()).not.toBeDisabled();

        await act(async () => {
          fireEvent.click(item.radarDimensionButtonAddNew());
        });

        /**
         * Rerender
         */
        rerender(
          getComponent({
            value,
            onChange,
          })
        );

        /**
         * Should add new dimensioon for radar
         */
        expect(item.radarDimensionName(false, 'Test-2')).toBeInTheDocument();

        /**
         * Should clean new item id field
         */
        expect(item.radarDimensionNewItemId()).toHaveValue('');
      });

      it('Should update dimension name', async () => {
        const { value, onChange } = createOnChangeHandler(radarItems);

        const { rerender } = render(
          getComponent({
            value,
            onChange,
          })
        );

        openItem(radarItem.id);

        /**
         * Initial state
         */
        expect(item.radarDimensionButtonAddNew()).toBeInTheDocument();
        expect(item.radarDimensionNewItemId()).toBeInTheDocument();
        expect(item.radarDimensionButtonAddNew()).toBeDisabled();
        expect(item.radarDimensionName(false, 'Test')).toBeInTheDocument();

        fireEvent.change(item.radarDimensionName(false, 'Test'), { target: { value: 'Test-New' } });

        /**
         * Rerender
         */
        rerender(
          getComponent({
            value,
            onChange,
          })
        );

        /**
         * Changes
         */
        expect(item.radarDimensionName(true, 'Test')).not.toBeInTheDocument();
        expect(item.radarDimensionName(false, 'Test-New')).toBeInTheDocument();
        expect(item.radarDimensionName(false, 'Test-New')).toHaveValue('Test-New');
      });

      it('Should update dimension value', async () => {
        const { value, onChange } = createOnChangeHandler(radarItems);

        const { rerender } = render(
          getComponent({
            value,
            onChange,
          })
        );

        openItem(radarItem.id);

        /**
         * Initial state
         */
        expect(item.radarDimensionButtonAddNew()).toBeInTheDocument();
        expect(item.radarDimensionNewItemId()).toBeInTheDocument();
        expect(item.radarDimensionButtonAddNew()).toBeDisabled();
        expect(item.radarDimensionValue(false, 'A:Value')).toBeInTheDocument();

        fireEvent.change(item.radarDimensionValue(false, 'A:Value'), { target: { value: 'A:Time' } });

        /**
         * Rerender
         */
        rerender(
          getComponent({
            value,
            onChange,
          })
        );

        /**
         * Changes
         */
        expect(item.radarDimensionName(true, 'A:Value')).not.toBeInTheDocument();
        expect(item.radarDimensionValue(false, 'A:Time')).toBeInTheDocument();
      });

      it('Should remove dimension', async () => {
        const radarItem = {
          uid: 'radar-2',
          id: 'radar-2',
          name: 'Radar-2',
          type: SeriesType.RADAR,
          radarDimensions: [
            {
              name: 'Test',
              uid: 'Dimension-Test',
              value: 'A:Value',
            },
            {
              name: 'Test-2',
              uid: 'Dimension-Test-2',
              value: 'A:Value',
            },
          ],
        };

        const radarItemsTest = [
          radarItem,
          {
            uid: 'other',
            id: 'other',
            name: 'Other',
          },
        ];

        const { value, onChange } = createOnChangeHandler(radarItemsTest);

        const { rerender } = render(
          getComponent({
            value,
            onChange,
          })
        );

        openItem(radarItem.id);

        /**
         * Initial state
         */
        expect(item.radarDimensionButtonAddNew()).toBeInTheDocument();
        expect(item.radarDimensionNewItemId()).toBeInTheDocument();
        expect(item.radarDimensionButtonAddNew()).toBeDisabled();
        expect(item.radarDimensionButtonRemove(false, 'Dimension-Test-2')).toBeInTheDocument();
        expect(item.radarDimensionButtonRemove(false, 'Dimension-Test')).toBeInTheDocument();

        await act(async () => {
          fireEvent.click(item.radarDimensionButtonRemove(false, 'Dimension-Test-2'));
        });

        /**
         * Rerender
         */
        rerender(
          getComponent({
            value,
            onChange,
          })
        );

        /**
         * Changes
         */
        expect(item.radarDimensionButtonRemove(true, 'Dimension-Test-2')).not.toBeInTheDocument();
        expect(item.radarDimensionButtonRemove(false, 'Dimension-Test')).toBeInTheDocument();
      });
    });
  });
});
