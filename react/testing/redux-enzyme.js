
import { mapDispatchToProps, mapStateToProps } from '.';

describe('Container', () => {
  describe('mapDispatchToProps', () => {
    let dispatch;
    let props;

    beforeAll(() => {
      dispatch = jest.fn(() => Promise.resolve());
      props = mapDispatchToProps(dispatch);
    });

    describe('functionFromDispatchName', () => {
      it('sets functionFromDispatchName on the props', () => {
        const expected = 'function';
        const actual = typeof props.functionFromDispatchName;

        expect(actual).toEqual(expected);
      });

      it('should request the announcements', () => {
        const expected = { type: 'amundsen/announcements/GET_REQUEST' };

        props.functionFromDispatchName();

        expect(dispatch.mock.calls[0][0]).toEqual(expected);
      });
    });
  });

  describe('mapStateToProps', () => {
    it('sets propOneName on the props', () => {
      const expected = globalState.announcements.propOneName;
      const actual = mapStateToProps(globalState).propOneName;

      expect(actual).toEqual(expected);
    });

    it('sets propTwoName on the props', () => {
      const expected = globalState.announcements.propTwoName;
      const actual = mapStateToProps(globalState).propTwoName;

      expect(actual).toEqual(expected);
    });

    it('sets propThreeName on the props', () => {
      const expected = globalState.announcements.propThreeName;
      const actual = mapStateToProps(globalState).announcements;

      expect(actual).toEqual(expected);
    });
  });
});
