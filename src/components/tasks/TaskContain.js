import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import { useQuery } from '@apollo/client';
import { HalfCircleSpinner } from 'react-epic-spinners';
import { GET_TASK_DATA } from '../../shared/graphql';
function TaskContain() {
  const TaskListQuery = () => {
    const { loading, error, data, refetch } = useQuery(GET_TASK_DATA);
    if (loading)
      return (
        <div className="d-flex justify-content-center p-5">
          <HalfCircleSpinner className="spinner" size={50} color="grey" />
        </div>
      );
    if (error) return `Error! `;

    return (
      <>
        <TaskForm refetch={refetch} />
        {data.tasksList.items.map((items) => {
          return (
            <div key={items.id} className="note-list">
              <TaskCard items={items} refetch={refetch} loading={loading} />
            </div>
          );
        })}
      </>
    );
  };

  return (
    <>
      <TaskListQuery />
    </>
  );
}

export default TaskContain;
