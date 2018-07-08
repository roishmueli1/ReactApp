import React, {Component} from 'react'
import Book from './Book'
import MdAdd from 'react-icons/lib/md/add'
//import data from '../Data/data.json'

class ByName extends Component{
    constructor(props){
        super(props);
        this.state = {
             books: [   
             ]
        }
        this.eachBook = this.eachBook.bind(this)
        this.update = this.update.bind(this)
        this.delete = this.delete.bind(this)
        this.add = this.add.bind(this)
        this.nextID = this.nextID.bind(this)
    }
    // componentWillMount(){
    //     var self=this
    //     data.map(function(book){
    //         console.log('book')
    //         self.add(book.book, book.group)
    //     }) 
    // }
    componentDidMount() {
        const url = "https://freebooksws.herokuapp.com/getAllFree";
        fetch(url)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            var self=this;
            data.map((data) => {
                console.log('book')
                self.add(data.bookName, data.author, data.freeByMonths.startDate, data.freeByMonths.lastDate);
            })
        })
 }
    update(newBook, i) {
        console.log('update:'+i+newBook)
        this.setState(prevState => ({
            books: prevState.books.map(
                book => (book.id !==i) ? book : {...book, book: newBook} )
        }))
    }
    delete(id) {
        console.log('delete at ', id)
        this.setState(prevState => ({
            books:prevState.books.filter(book => book.id != id)
        }))
    }
    add(bn, au, sd, ld) {
        // var txt="some txt";
        // var grp="some grp";
        this.setState(prevState => ({
            books: [
                ...prevState.books,
                {
                    id:this.nextID(),
                    book:bn,
                    author:au,
                    freeByMonths: {
                        startDate: sd, 
                        lastDate: ld
                    }
                }
            ]
        }))
    }
    nextID() {
        this.uniqueId = this.uniqueId || 0
        return this.uniqueId++
    }
    eachBook(book, i){
        return (
            <div key={'container'+i}className="card" style={{width: 18+'rem', marginBottom: 7+'px'}}>
                <div className="card-body">
                    <Book key={'Book'+i} index={i} 
                        onChange={this.update}
                        onDelete={this.delete}>
                        <h5 className="card-title">{book.book}</h5>
                        <p className="card-text">{book.author}</p>
                        <p className="card-text">Start Date: {book.freeByMonths.startDate}</p>
                        <p className="card-text">Last Date: {book.freeByMonths.lastDate}</p>
                    </Book>
                </div>
            </div> 
            
        )
    }
    render(){
        return (
            <div className="ByName">
             {this.state.books.map(this.eachBook)}
             <button onClick = {this.add}
                id="add" className="btn btn-primary" style={{marginTop: 7+'px'}}>
                <MdAdd/></button>
            </div>
        )
    }
}

export default ByName