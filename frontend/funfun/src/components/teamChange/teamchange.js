import React from "react";
import { DragDropContext, DropTarget, DragSource } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend'
import {update} from "immutability-helper";

const tasks = [
  { _id: 1, title: "정현모 1", status: "1팀" },
  { _id: 2, title: "정현모 2", status: "1팀" },
  { _id: 3, title: "정현모 3", status: "1팀" },
  { _id: 4, title: "현수진 1", status: "2팀" },
  { _id: 5, title: "현수진 2", status: "2팀" },
  { _id: 6, title: "천영재 1", status: "3팀" },
  { _id: 7, title: "한진영 1", status: "4팀" },
  { _id: 8, title: "한진영 2", status: "4팀" },
  { _id: 9, title: "이홍덕 1", status: "5팀" },
  { _id: 10, title: "이홍덕 2", status: "5팀" }
];

const channels = ["1팀", "2팀", "3팀", "4팀", "5팀"];
const labelsMap = {
  team1: "1팀",
  team2: "2팀",
  team3: "3팀",
  team4: "4팀",
  team5: "5팀"
};

const classes = {
  board: {
    display: "flex",
    margin: "0 auto",
    width: "90vw",
  },
  column: {
    minWidth: 200,
    width: "18vw",
    height: "80vh",
    margin: "0 auto",
    backgroundColor: "#FCC8B2"
  },
  columnHead: {
    textAlign: "center",
    padding: 10,
    fontSize: "18px",
    backgroundColor: "#C6D8AF"
  },
  item: {
    padding: 10,
    margin: 10,
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "white"
  }
};

class Kanban extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks
    };
  }
  update = (id, status) => {
    const { tasks } = this.state;
    const task = tasks.find(task => task._id === id);
    task.status = status;
    const taskIndex = tasks.indexOf(task);
    const newTasks = update(tasks, {
      [taskIndex]: { $set: task }
    });
    this.setState({ tasks: newTasks });
  };

  render() {
    const { tasks } = this.state;
    return (
      <main>
        <section style={classes.board}>
          {channels.map(channel => (
            <KanbanColumn status={channel}>
              <div style={classes.column}>
                <div style={classes.columnHead}>{labelsMap[channel]}</div>
                <div>
                  {tasks
                    .filter(item => item.status === channel)
                    .map(item => (
                      <KanbanItem id={item._id} onDrop={this.update}>
                        <div style={classes.item}>{item.title}</div>
                      </KanbanItem>
                    ))}
                </div>
              </div>
            </KanbanColumn>
          ))}
        </section>
      </main>
    );
  }
}

export default DragDropContext(HTML5Backend)(Kanban);

// Column

const boxTarget = {
  drop(props) {
    return { name: props.status };
  }
};

class KanbanColumn extends React.Component {
  render() {
    return this.props.connectDropTarget(<div>{this.props.children}</div>);
  }
}

KanbanColumn = DropTarget("kanbanItem", boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(KanbanColumn);

// Item

const boxSource = {
  beginDrag(props) {
    return {
      name: props.id
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    if (dropResult) {
      props.onDrop(monitor.getItem().name, dropResult.name);
    }
  }
};

class KanbanItem extends React.Component {
  render() {
    return this.props.connectDragSource(<div>{this.props.children}</div>);
  }
}

KanbanItem = DragSource("kanbanItem", boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(KanbanItem);
