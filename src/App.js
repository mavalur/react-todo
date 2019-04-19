import React, {Component} from 'react';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            todoItems: [],
            value: ""
        }


        this.onToDoItemCheckedStatusChange = this.onToDoItemCheckedStatusChange.bind(this);
        this.onTodoItemAddition = this.onTodoItemAddition.bind(this);
        this.onTodoItemEntryChange = this.onTodoItemEntryChange.bind(this);
        this.onDeleteHandler = this.onDeleteHandler.bind(this);



    }



    onToDoItemCheckedStatusChange(idx) {
        const updatedTodo = this.state.todoItems;
        updatedTodo[idx]["checked"] = !updatedTodo[idx]["checked"];

        this.setState({
            todoItems: updatedTodo
        })
    }

    onTodoItemEntryChange(term){
        this.setState({value: term});
    }
    onTodoItemAddition(){
        const term = this.state.value
        this.setState({
            todoItems: [...this.state.todoItems, {checked: false, text: term.trim()}],
            value: ""
        });
    }

    onDeleteHandler(entries){
        this.setState({
            todoItems:entries
        })
    }

    render() {
        return (
            <div className="App">
                <div className="container center">
                    <h1 className="center title">My TODO App</h1>
                    <TodoSummary collection={this.state.todoItems}></TodoSummary>
                    <TodoCapture value={this.state.value} onTodoItemAddition={this.onTodoItemAddition} onTodoItemEntryChange={this.onTodoItemEntryChange}></TodoCapture>
                    <TodoView collection={this.state.todoItems}
                                   handler={this.onToDoItemCheckedStatusChange} onDeleteHandler={this.onDeleteHandler}></TodoView>
                </div>
            </div>
        );
    }
}


class TodoCapture extends  Component {
    constructor(props){
        super(props);



        this.todoEntryChange = this.todoEntryChange.bind(this);
        this.addTodoAddAction = this.addTodoAddAction.bind(this);
    }

    addTodoAddAction(clickEvent) {
        console.log(clickEvent.target.value)
        clickEvent.preventDefault()
        if (!!this.props.value && this.props.value.trim().length > 0) {
            this.props.onTodoItemAddition()
        }
    }

    todoEntryChange(event) {
        this.props.onTodoItemEntryChange(event.target.value);
    }


    render(){

        return (
            <form onSubmit={this.addTodoAddAction}>
                <fieldset>
                    <legend>Enter To-do:</legend>
                    <input value={this.props.value}
                           onChange={this.todoEntryChange} className="button center"/>
                    <button className="button center" type="submit" onClick={this.addTodoAddAction}>ADD</button>
                </fieldset>

            </form>
        )
    }

}


class TodoView extends Component {

    constructor(props) {
        super(props);
        this.checkStatusChangeHandler = this.checkStatusChangeHandler.bind(this);
        this.deleteActionHandler = this.deleteActionHandler.bind(this);

    }

    checkStatusChangeHandler(idx) {
        this.props.handler(idx);
    }

    deleteActionHandler(idx){
        let items = [...this.props.collection]

        if(idx < items.length){
            items.splice(idx, 1);
            this.props.onDeleteHandler(items)
        }

    }

    render() {

        const listItems = this.props.collection.map((entry, idx) =>
            <li  key={idx}>
                <input type="checkbox" className="todo-checkbox" checked={entry.checked} onChange={this.checkStatusChangeHandler.bind(this,idx)}
                       title="Mark Complete"/>
                <span>{entry.text}</span>
                <input type="button" className="todo-delete" value="Remove" onClick={this.deleteActionHandler.bind(this,idx)}/>
            </li>
        );

        return (<div className="todo-container" ><ul className="todo-list">{listItems}</ul></div>)
    };
}


function TodoSummary(props) {
    const entries = props.collection;
    return (
        <div className="flow-right controls">
            <span>Item count: <span id="item-count">{entries.length}</span></span>
            <span>Unchecked count: <span id="unchecked-count">{entries.filter((entry)=> !entry.checked).length
            }</span></span>
        </div>
    )
}

export default App;
