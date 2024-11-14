import * as actionCreators from '../../store/actions';
import * as selectors from '../../store/selectors';

const NotesList = ({ notes, openNoteId, addNote, openNote }) => (
  // ...
);

const mapStateToProps = (state) => ({
  notes: selectors.getNotes(state),
  openNoteId: selectors.getOpenNoteId(state),
});

export default connect(mapStateToProps, actionCreators)(NotesList);
