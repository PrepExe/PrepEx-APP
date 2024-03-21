import axios from 'axios';
import { ExamBoard, SetStringState } from '../../../../utils/types';
import { useEffect, useState } from 'react';
import React from 'react';

type AddSubjectModalLevelProps = {
  setExamBoard: SetStringState;
  setExamBoardLevel: SetStringState;
};

const AddSubjectModalLevel = (props: AddSubjectModalLevelProps) => {
  const [examBoards, setExamBoards] = useState<ExamBoard[]>([]);

  const fetchExamBoardsAndLevels = async () => {
    try {
      const res = await axios.get('/api/subjects/boards');
      setExamBoards(res.data.examBoards);
    } catch (err: any) {
      console.error('Error fetching exam boards:', err.response.data.error);
    }
  };

  const selectBoardAndLevel = (board: ExamBoard, level: string) => {
    props.setExamBoard(board.exam_board);
    props.setExamBoardLevel(level);
  };

  useEffect(() => {
    fetchExamBoardsAndLevels();
  }, []);

  return (
    <div className='fixed z-50 flex flex-col w-3/12 h-auto p-4 rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary'>
      <h1 className='font-semibold'>Select your exam board and level</h1>
      <form className='flex flex-row items-baseline space-y-4 gap-4 h-full'>
        <div className='w-full'>
          <ul className='bg-primary border border-accent rounded-lg mt-2 overflow-y-scroll h-64'>
            {examBoards.map((board: ExamBoard) => (
              <div key={board.exam_board}>
                {board.levels.map((level: string) => (
                  <li
                    key={level}
                    className='flex items-center h-12 w-full p-2 hover:bg-accent hover:cursor-pointer'
                    onClick={() => selectBoardAndLevel(board, level)}>
                    <p className='font-medium'>{`${board.exam_board} ${level}`}</p>
                  </li>
                ))}
              </div>
            ))}
          </ul>
        </div>
      </form>
    </div>
  );
};

export default AddSubjectModalLevel;
