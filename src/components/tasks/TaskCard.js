import { Checkbox } from '@material-ui/core';
import TaskEdit from './TaskEdit';

function TaskCard({ items, refetch, loading }) {
  //este componente genera una "task card" que estarå en el tasks contain
  const handleToggle = async (id, completed) => {
    const UPDATE_COMPLETED_TASK_WEBHOOK_API_ENDPOINT = `https://api.8base.com/ckxmiydpu00bd09l14ivagjx5/webhook/items/${id}`;

    await fetch(UPDATE_COMPLETED_TASK_WEBHOOK_API_ENDPOINT, {
      method: 'PUT',
      body: JSON.stringify({ completed: !completed }),
    });
    refetch();
  };

  return (
    <div className="note-contain">
      <div className="checkbox" onClick={() => handleToggle(items.id, items.completed)}>
        <Checkbox edge="start" checked={items.completed} disableRipple tabIndex={-1} />
      </div>
      <h1 className="card-title">{items.title} </h1>
      <p className="card-text">{items.text}</p>
      <div className="edit-note">
        <TaskEdit items={items} refetch={refetch} />
      </div>
    </div>
  );
}

export default TaskCard;
