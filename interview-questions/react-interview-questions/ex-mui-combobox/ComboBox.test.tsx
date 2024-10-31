/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, fireEvent, screen } from 'test/utils';
import { spy } from 'sinon';
import ComboBox from './ComboBox';

const smallFixture = [
  {
    label: 'France',
    value: 'FR',
  },
  {
    label: 'Germany',
    value: 'DE',
  },
];

/**
 * You can run these tests with `yarn t ComboBox`.
 */
describe('<ComboBox />', () => {
  const render = createClientRender();

  it('should prevent the default event handlers', () => {
    const handleSubmit = spy();
    const handleChange = spy();

    render(
      <div
        onKeyDown={(event) => {
          if (!event.defaultPrevented && event.key === 'Enter') {
            handleSubmit();
          }
        }}
      >
        {/* The ComboBox component here */}
        <ComboBox onChange={handleChange} options={smallFixture} />
      </div>,
    );

    const textbox = screen.getByRole('combobox');

    fireEvent.keyDown(textbox, { key: 'ArrowDown' }); // open the popup
    fireEvent.keyDown(textbox, { key: 'ArrowDown' }); // focus the first option
    const options = screen.getAllByRole('option');
    expect(textbox).to.have.attribute('aria-activedescendant', options[0].getAttribute('id') ?? '');

    fireEvent.keyDown(textbox, { key: 'Enter' }); // select the first option
    expect(handleSubmit.callCount).to.equal(0);
    expect(handleChange.callCount).to.equal(1);
  });

  describe('render', () => {
    it('should render the main elements', () => {
      const handleChange = spy();
      render(<ComboBox options={smallFixture} onChange={handleChange} />);

      const comboBox = screen.getByRole('combobox');
      expect(comboBox).toBeVisible();

      fireEvent.keyDown(comboBox, { key: 'ArrowDown' }); // open the popup
      const listBox = screen.getByRole('listbox');
      expect(listBox).toBeVisible();
    });
  });

  describe('behavior', () => {
    it('should call onChange with the correct value when an option is selected', () => {
      const handleChange = spy();
      render(<ComboBox options={smallFixture} onChange={handleChange} />);

      const comboBox = screen.getByRole('combobox');
      fireEvent.click(comboBox);
      const options = screen.getAllByRole('option');
      fireEvent.click(options[0]);

      expect(handleChange.calledWith(smallFixture[0].value)).to.equal(true);
    });

    describe('filtering options', () => {
      it('should filter options based on user input', () => {
        const handleChange = spy();
        render(<ComboBox options={smallFixture} onChange={handleChange} />);

        const comboBox = screen.getByRole('combobox');
        fireEvent.click(comboBox); // Open the dropdown

        // Initially, all options should be visible
        expect(screen.getByText('France')).to.be.visible;
        expect(screen.getByText('Germany')).to.be.visible;

        // Simulate user typing to filter options
        fireEvent.change(comboBox, { target: { value: 'Fr' } });

        // Check that only the filtered option is visible
        expect(screen.getByText('France')).to.be.visible;
        expect(screen.queryByText('Germany')).not.to.exist; // Germany should not be visible

        // Clear the input
        fireEvent.change(comboBox, { target: { value: '' } });

        // All options should be visible again
        expect(screen.getByText('France')).to.be.visible;
        expect(screen.getByText('Germany')).to.be.visible;
      });
    });
  });

  describe('edge cases', () => {
    it('should handle empty options array', () => {
      const handleChange = spy();
      render(<ComboBox options={[]} onChange={handleChange} />);
      const comboBox = screen.getByRole('combobox');
      expect(comboBox).toBeVisible();

      fireEvent.click(comboBox);
      expect(screen.queryByRole('listbox')).not.to.exist;
    });

    it('should handle long option lists', () => {
      const handleChange = spy();
      const longOptions = Array.from({ length: 1000 }, (_, i) => ({
        label: `Option ${i}`,
        value: `${i}`,
      }));
      render(<ComboBox options={longOptions} onChange={handleChange} />);

      const comboBox = screen.getByRole('combobox');
      fireEvent.click(comboBox);

      const options = screen.getAllByRole('option');
      expect(options).to.have.length(1000);
    });

    it('should handle special characters in options', () => {
      const handleChange = spy();
      const specialOptions = [
        { label: 'Option with spaces', value: 'space' },
        { label: 'Option with symbols !@#$%^&*()', value: 'symbols' },
        { label: 'Option with unicode 你好', value: 'unicode' },
      ];
      render(<ComboBox options={specialOptions} onChange={handleChange} />);

      const comboBox = screen.getByRole('combobox');
      fireEvent.click(comboBox);

      specialOptions.forEach((option) => {
        expect(screen.getByText(option.label)).to.be.visible;
      });
    });
  });
});
