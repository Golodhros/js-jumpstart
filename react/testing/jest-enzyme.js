// Patterns
// -------------

// Structure
const setup = ...

describe('ComponentName', () => {
    describe('render', () => {
        describe('when X', () => {

        });
        describe('when Y', () => {

        });
    });

    describe('lifetime', () => {
        describe('when clicking on X', () => {
          it('should call the onClick handler', () => {
            const clickSpy = jest.fn();
            const { wrapper } = setup({
              onClick: clickSpy
            });
            const expected = 1;

            wrapper.find(Link).simulate('click');

            const actual = clickSpy.mock.calls.length;

            expect(actual).toEqual(expected);
          });
        });
      });
});


// Setup
const setup = (propOverrides) => {
    const props = {
      defaultProp1: [],
      defaultProp2: true,
      ...propOverrides,
    };
    const wrapper = mount(
        <ComponentUnderTest {...props} />
    );

    return { props, wrapper };
};
// Setup with shortcuts
const setup = propOverrides => {
    const props = {
      completedCount: 0,
      activeCount: 0,
      onClearCompleted: jest.fn(),
      ...propOverrides,
    };
    const wrapper = shallow(<Footer {...props} />)

    return {
      props,
      wrapper,
      clear: wrapper.find('.clear-completed'),
      count: wrapper.find('.todo-count'),
    }
  }


// TypeScript version
const setup = (propOverrides?: Partial<AnnouncementsListProps>) => {
    const props = {
      announcements: [],
      ...propOverrides,
    };
    const wrapper = mount<typeof AnnouncementsList>(
      <BrowserRouter>
        <AnnouncementsList {...props} />
      </BrowserRouter>
    );

    return { props, wrapper };
};





// Minimal Test
describe('MainSection Component', () => {
    test('render', () => {
        const { wrapper } = setup();
        const expected = true;
        const actual = wrapper.exists();

        expect(actual).toEqual(expected);
    });
});
// Another option
it('renders without issues', () => {
    expect(() => {
      setup();
    }).not.toThrow();
});


// Render Test
describe('render', () => {
    describe('when X', () => {
        it('renders a <thing>', () => {
            const { wrapper } = setup();
            const expected = 1;
            const actual = wrapper.find('.<thingClass>').length;

            expect(actual).toEqual(expected);
          });
    });

    describe('list of items', () => {
        it('should render zero items', () => {
            const wrapper = setup({items: []});
            const expected = 0;
            const actual = wrapper.find('li').length;

            expect(actual).toEqual(expected);
        });

        it('should render undefined items', () => {
            const wrapper = setup({items: undefined});
            const expected = 0;
            const actual = wrapper.find('li').length;

            expect(actual).toEqual(expected);
        });

        it('should render some items', () => {
            const items = ['Sam Adams', 'Resin', 'Octoberfest'];
            const wrapper = setup({items: items});
            const expected = items.length;
            const actual = wrapper.find('li').length;

            expect(actual).toEqual(expected);
        });
    });
});



// Lifecycle tests
// Checking for events
input.simulate('click');
input.simulate('change', {target: { value: 'Resin' }});




// Checking an attribute
it('takes users to the announcements page', () => {
    const { wrapper } = setup();
    const expected = '/announcements';
    const actual = wrapper.find('a.announcements-more-link').getDOMNode().attributes.getNamedItem('href').value;

    expect(actual).toEqual(expected);
});



// Generated Tests
describe('todo list', () => {

    const testFilteredTodos = (filter, todos) => {
      test(`render ${filter} items`, () => {
        const { wrapper, footer } = setup();
        const expected = todos;

        footer.props().onShow(filter);
        const actual = wrapper.find(TodoItem).map(node => node.props().todo);

        expect(actual).toEqual(expected)
      })
    };

    testFilteredTodos(SHOW_ALL, todos);
    testFilteredTodos(SHOW_ACTIVE, [todos[0]]);
    testFilteredTodos(SHOW_COMPLETED, [todos[1]]);
});




// Async test waiting for fetch call
// Reference: https://www.benmvp.com/blog/asynchronous-testing-with-enzyme-react-jest/
import { submitNewItem } from '../utils'

jest.mock('../utils');

const runAllPromises = () => {
    return new Promise((resolve) => {
      setImmediate(() => {
        resolve();
      });
    });
}


test('new item is added to the UI when the form is successfully submitted', async () => {
    // Instead of making a real API call, mock the helper to return a
    // resolved promise with the data that would come back from the API
    submitNewItem.mockResolvedValueOnce({ id: 14, title: 'Gucci sneakers' })

    const expected = 1;
    const wrapper = setup();
    const preventDefault = jest.fn()

    wrapper
      .find('[data-testid="addform-form"]')
      .simulate('submit', { preventDefault })

    expect(preventDefault).toHaveBeenCalledTimes(1)

    await runAllPromises();
    // after waiting for all the promises to be exhausted
    // we can do our UI check
    component.update();
    const actual = component.find('[data-testid="adder-items"]').length;
    expect(actual).toEqual(expected);
});
