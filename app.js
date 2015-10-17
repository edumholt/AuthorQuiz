(function() {
  'use strict';

  var Quiz = React.createClass({
    propTypes: {
      data: React.PropTypes.array.isRequired
    },
    getInitialState: function() {
      return this.props.data.selectGame();
    },
    render: function() {
      return (<div>
            <div className="row">
              <div className="col-md-4">
                <img src={this.state.author.imageUrl} className="authorimage col-md-3"/>
              </div>
              <div className="col-md-7">
                {this.state.books.map(function(b){
                  return <Book title={b} />;
                },this)}
              </div>
              <div className="col-md-1"></div>
            </div>
          </div>);
    }
  });

  var data = [
    {
      name: 'Mark Twain',
      imageUrl: 'thirdparty/images/authors/marktwain.jpg',
      books: ['The Adventures of Huckleberry Finn']
    },
    {
      name: 'Joseph conrad',
      imageUrl: 'thirdparty/images/authors/josephconrad.png',
      books: ['Heart of Darkness']
    },
    {
      name: 'J.K. Rowling',
      imageUrl: 'thirdparty/images/authors/jkrowling.jpg',
      imageSource: 'Wikipedia Commons',
      imageAttribution: 'Daniel Ogren',
      books: ['Harry Potter and the Sorcerers Stone']
    },
    {
      name: 'Stephen King',
      imageUrl: 'thirdparty/images/authors/stephenking.jpg',
      imageSource: 'Wikipedia Commons',
      imageAttribution: 'Pinguino',
      books: ['The Shining', 'IT']
    },
    {
      name: 'Charles Dickens',
      imageUrl: 'thirdparty/images/authors/charlesdickens.jpg',
      imageSource: 'Wikipedia Commons',
      books: ['David Copperfield', 'A Tale of Two Cities']
    },
    {
      name: 'William Shakespear',
      imageUrl: 'thirdparty/images/authors/williamshakespeare.jpg',
      imageSource: 'Wikipedia Commons',
      books: ['Hamlet', 'Macbeth', 'Romeo and Juliet']
    },
  ]

  var Book = React.createClass({
    propTypes: {
      title: React.PropTypes.string.isRequired
    },
    render: function() {
      return <div className="answer"><h4>{this.props.title}</h4></div>
    }
  });

  data.selectGame = function() {
    var books = _.shuffle(this.reduce(function(p, c, i){
      return p.concat(c.books);
    }, [])).slice(0, 4);

    var answer = books[_.random(books.length-1)];

    return {
      books: books,
      author: _.find(this, function(author) {
        return author.books.some(function(title) {
          return title === answer;
        });
      })
    };

  };

  ReactDOM.render(
    <Quiz data={data}/>,
      document.getElementById('app')
  );

})();
