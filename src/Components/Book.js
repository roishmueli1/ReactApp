import React, {Component} from 'react'
import MdDelete from 'react-icons/lib/md/delete'
import MdSave from 'react-icons/lib/md/save'
import MdEdit from 'react-icons/lib/md/edit'

class Book extends Component{
    constructor(props){
        super(props)
        this.state = {
            editing: false
        }
        this.edit = this.edit.bind(this)
        this.delete = this.delete.bind(this)
        this.save = this.save.bind(this)
        this.renderForm = this.renderForm.bind(this)
        this.renderUi = this.renderUi.bind(this)
    }
    edit(){
        this.setState({
            editing: true
        });
    }
    delete(){
        this.props.onDelete(this.props.index)
    }
    save(e){
        e.preventDefault()
        this.props.onChange(this._newBook.value, this.props.index)
        this.setState({
            editing: false
        })
    }
    
    renderForm(){
        return(
            <div>
                <form onSubmit={this.save}>
                    <textarea ref={input=>this.newBook = input}/>
                    <button><MdSave onClick={this.save}/></button>
                </form>
            </div>
            )
    }
    renderUi(){ 
        return(
            <div className='book'>
                <div> {this.props.children}</div>
                <span>
                    <button onClick = {this.edit} className="btn btn-primary" style={{marginRight: 7+'px'}}><MdEdit/></button>
                    <button onClick = {this.delete} className="btn btn-primary"><MdDelete/></button>
                </span>
            </div>
            )
    }
    render(){
        return this.state.editing ? this.renderForm(): this.renderUi()
    }
}

export default Book