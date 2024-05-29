import React, { useState } from 'react';

function App() {
  const [task, settask] = useState([
    {
      id: 'id-' + Date.now(),
      title: "primeira tarefa",
      description: "Minha primeira tarefa",
      done: false,
    },
    {
      id: 'id-' + (Date.now() + 1), // Adiciona +1 para garantir IDs únicos
      title: "segunda tarefa",
      description: "Minha segunda tarefa",
      done: false,
    }
  ]);

  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  const handleSave = () => {
    const newTaskWithId = {
      ...newTask,
      id: 'id-' + Date.now(),
      done: false
    };
    settask([...task, newTaskWithId]);
    setNewTask({ title: '', description: '' });
    setmodalIsOpen(false);
  };

  const handleCancel = () => {
    setNewTask({ title: '', description: '' });
    setmodalIsOpen(false);
  };

  return (
    <div className='h-screen flex flex-col items-center justify-center bg-gray-700'>
      <div className={`flex flex-col h-2/3 w-1/2 ${modalIsOpen && 'blur-sm'}`}>
        <div className='flex justify-between px-5 py-2.5 items-center'>
          <h1 className='text-center text-white'>App Tarefas</h1>
          <button
            onClick={() => setmodalIsOpen(true)}
            className='border border-white p-2 rounded-lg'
          >
            + Nova Tarefa
          </button>
        </div>
        <div className='flex-grow px-5 py-2.5 bg-gray-400 rounded-xl flex flex-col divide-y divide-slate-700'>
          {task.map((t) => {
            return (
              <div key={t.id} className='text-sm p-2.5'>
                <p className='text-medium font-bold'>{t.title}</p>
                <p className='text-slate-600'>{t.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {modalIsOpen && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div className='absolute inset-0 bg-black opacity-50'></div>
          <div className='bg-white p-6 rounded-lg z-10'>
            <h2 className='text-lg font-bold mb-4'>Nova Tarefa</h2>
            <form className='flex flex-col'>
              <label className='mb-2'>
                Título:
                <input
                  type='text'
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className='border p-1 rounded-md w-full'
                />
              </label>
              <label className='mb-4'>
                Descrição:
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className='border p-1 rounded-md w-full'
                ></textarea>
              </label>
              <div className='flex justify-end space-x-2'>
                <button
                  type='button'
                  onClick={handleCancel}
                  className='border border-gray-500 p-2 rounded-lg'
                >
                  Cancelar
                </button>
                <button
                  type='button'
                  onClick={handleSave}
                  className='border border-blue-500 p-2 rounded-lg bg-blue-500 text-white'
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
