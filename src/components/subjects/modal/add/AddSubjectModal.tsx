import { useState } from 'react';
import { SetSubjects, Subject } from '../../../../utils/types';
import AddSubjectModalLevel from './AddSubjectModalLevel';
import AddSubjectModalSubject from './AddSubjectModalSubject';
import AddSubjectModalConfirm from './AddSubjectModalConfirmSubject';

type AddSubjectModalProps = {
  closeModal: () => void;
  subjects: Subject[];
  setSubjects: SetSubjects;
};

const AddSubjectModal = (props: AddSubjectModalProps) => {
  const [examBoard, setExamBoard] = useState('');
  const [examBoardLevel, setExamBoardLevel] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<Subject>();

  return (
    <>
      <div className='fixed z-40 flex items-center justify-center bg-modal-backdrop w-full h-full top-0 left-0' onClick={props.closeModal}></div>
      {!examBoardLevel ? (
        <AddSubjectModalLevel setExamBoard={setExamBoard} setExamBoardLevel={setExamBoardLevel} />
      ) : (
        !selectedSubject ? (
          <AddSubjectModalSubject closeModal={props.closeModal} subjects={props.subjects} setSubjects={props.setSubjects} setSelectedSubject={setSelectedSubject} selectedSubject={selectedSubject} examBoard={examBoard} examBoardLevel={examBoardLevel} />
        ) : (
          <AddSubjectModalConfirm closeModal={props.closeModal} subjects={props.subjects} setSubjects={props.setSubjects} selectedSubject={selectedSubject} setSelectedSubject={setSelectedSubject} />
        )
      )}
    </>
  );
};

export default AddSubjectModal;


