import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
class App extends Component {
  state = {task: '', tag: tagsList[0].displayText, tasksList: [], activeTab: ''}

  onInputTask = event => {
    this.setState({task: event.target.value})
  }

  onSelectTaskCategory = event => {
    const selectedCategory = tagsList.filter(
      tag => tag.optionId === event.target.value,
    )

    this.setState({tag: selectedCategory[0].displayText})
  }

  onAddTask = event => {
    event.preventDefault()
    const {task, tag} = this.state

    if (tag !== '' && task !== '') {
      const newTask = {
        id: uuidv4(),
        task,
        tag,
      }

      this.setState(prevState => ({
        tasksList: [...prevState.tasksList, newTask],
        tag: tagsList[0].displayText,
        task: '',
      }))
    }
  }

  onClickCategory = event => {
    const {activeTab} = this.state
    const category = event.target.textContent

    if (activeTab === '' || activeTab !== category) {
      this.setState({activeTab: category})
    } else {
      this.setState({activeTab: ''})
    }
  }

  renderTasksList = filteredTaskList => (
    <ul className="tasks-list">
      {filteredTaskList.map(eachTask => (
        <li className="list-item" key={eachTask.id}>
          <p className="task">{eachTask.task}</p>
          <p className="tag">{eachTask.tag}</p>
        </li>
      ))}
    </ul>
  )

  renderNoTasksView = () => (
    <div className="no-tasks-view-container">
      <p className="no-task">No Tasks Added Yet</p>
    </div>
  )

  render() {
    const {task, tag, tasksList, activeTab} = this.state

    let filteredTaskList
    if (activeTab !== '') {
      filteredTaskList = tasksList.filter(
        eachTask => eachTask.tag === activeTab,
      )
    } else {
      filteredTaskList = tasksList
    }

    return (
      <div className="app-container">
        <div className="create-task-container">
          <h1 className="create-task-heading">Create a task!</h1>
          <form className="input-task-form" onSubmit={this.onAddTask}>
            <div className="input-container">
              <label className="label" htmlFor="task">
                Task
              </label>
              <input
                className="input"
                id="task"
                type="text"
                placeholder="Enter the task here"
                value={task}
                onChange={this.onInputTask}
              />
            </div>
            <div className="input-container">
              <label className="label" htmlFor="tags">
                Tags
              </label>
              <select
                className="input"
                id="tags"
                value={tag.toUpperCase()}
                onChange={this.onSelectTaskCategory}
              >
                {tagsList.map(eachTag => (
                  <option
                    className="option"
                    key={eachTag.optionId}
                    value={eachTag.optionId}
                  >
                    {eachTag.displayText}
                  </option>
                ))}
              </select>
            </div>
            <button className="add-task-btn" type="submit">
              Add Task
            </button>
          </form>
        </div>
        <div className="show-tasks-container">
          <h1>Tags</h1>
          <ul className="tags-list">
            {tagsList.map(eachTag => (
              <li key={eachTag.optionId}>
                <button
                  className={
                    eachTag.displayText === activeTab
                      ? 'act-tag-btn'
                      : 'tag-btn'
                  }
                  type="button"
                  onClick={this.onClickCategory}
                >
                  {eachTag.displayText}
                </button>
              </li>
            ))}
          </ul>
          <h1>Tasks</h1>
          {filteredTaskList.length === 0
            ? this.renderNoTasksView()
            : this.renderTasksList(filteredTaskList)}
        </div>
      </div>
    )
  }
}

export default App
