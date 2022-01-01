import React, { useState } from 'react';
import { gql } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';

function TaskForm({ taskCreate, refetch }) {
  const [step, setStep] = useState(1);
  const [task, setTask] = useState({
    title: '',
    text: '',
  });

  const onInputChange = (e) => {
    e.preventDefault();
    const {
      target: { name, value },
    } = e;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const isStepComplete = (step) => {
    switch (step) {
      case 1:
        return !!task.title;
      case 2:
        return !!task.text;

      default:
        return false;
    }
  };

  const completeStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      const stepComplete = isStepComplete(step);
      if (stepComplete) {
        setStep(step + 1);
        return;
      }
    }

    const formComplete = isStepComplete(step);
    if (formComplete) {
      submit(task);
    }
  };

  const submit = async (task) => {
    const res = await taskCreate({ variables: { data: task } });
    if (res.data.taskCreate.id) {
      setTask({ title: '', text: '' });
      setStep(step - 1);
      refetch();
    }
  };

  const inputForm = (name, value, ph) => {
    return (
      <div className="form-group">
        <div className="form-group">
          <input
            className="form-control"
            name={name}
            placeholder={ph}
            value={value}
            onChange={onInputChange}
            maxLength="13"
          />
        </div>
      </div>
    );
  };

  return (
    <form className="note-form" onSubmit={completeStep}>
      <div className="inputs-holder">
        {step === 1 ? inputForm('title', task.title, 'The post title') : inputForm('text', task.text, 'Create a note')}
      </div>
      {step > 1 && (
        <button className="prev-button" id="prev" type="button" onClick={() => setStep(step - 1)}>
          Prev
        </button>
      )}
      <button className="submit-button" type="submit">
        {step === 1 ? <span>Next</span> : <span>Submit</span>}
      </button>
    </form>
  );
}

const TASK_MUTATION = gql`
  mutation TaskCreate($data: TaskCreateInput!) {
    taskCreate(data: $data) {
      id
    }
  }
`;

export default graphql(TASK_MUTATION, { name: 'taskCreate' })(TaskForm);
