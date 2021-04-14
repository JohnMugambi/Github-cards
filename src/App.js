import React from 'react';
import axios from 'axios';
import './App.css';

//array of objects
// const testData = [
//   {
//     name : "Dan Abramov", 
//     avatar_url : "75.png",  
//     company : "Facebook", 
//     alt_image: "Picture contains one person"
//   },
//   {
//     name : "Sophie Alpert", 
//     avatar_url : "75.png",  
//     company : "Facebook", 
//     alt_image: "Picture contains one person"
//   },
//   {
//     name : "Sebastian Markbage", 
//     avatar_url : "75.png",  
//     company : "Facebook",
//     alt_image: "Picture contains one person"
//   }

// ];
//map function takes a function as an argument, taking one array
//and converting it into another array using the return values in the function
//e.g. [<Card />, <Card />, <Card /> ]
const CardList = (props) => {
  // function mapProfile(testDataObj){
  //   return <Card key={profile.id} {...testDataObj}/>;
  // };
  return(
    <div>
      {props.profiles.map(profile=><Card key={profile.id} {...profile}/>)}; 
    </div>
    //<Card {...testData[0]}/>
  );
}
class Card extends React.Component{
  render(){
    const profile = this.props; //instance of the object i.e {...testdata[]}
    return(
      <div className="github-profile">
        <img src={profile.avatar_url } alt="person"/>
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="company">{profile.company}</div>
        </div>
      </div>
    );
  }
}
class Form extends  React.Component{
  state = {
    userName:"", 
  }
  handleSubmit= async (event)=>{
    event.preventDefault();
    const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
    this.props.onSubmit(resp.data);
    this.setState({userName: ""});
  } 
  //controlling a component to force its ui state through rect rather than from the DOM 
  //userNameInput = React.createRef();
  // console.log(this.userNameInput.current.value);
  // every event function in react receives an event argument
  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <input 
        type="text" 
        placeholder="Enter github username"
        value={this.state.userName}
        onChange={(event)=> this.setState({userName:event.target.value})}
        required 
        //ref={this.userNameInput}
        />
        <button>Add Card</button>
      </form>
    );
  }
}
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      profiles: [],
    };
    //this has to be an object
    //to enable access to this arry through all components i.e  form and cardlist
  }
  addNewProfile = (profileData)=>{
    this.setState((prevState)=>({
      profiles: [...prevState.profiles, profileData]
    }))
  }
	render() {
  	return (
    	<div >
    	  <div className="header">{this.props.title}</div>
        <Form onSubmit={this.addNewProfile}/>
        <CardList profiles={this.state.profiles}/>  
    	</div>
    );
  }	
}

export default App;

