
import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import Basic from '../abis/Basic.json';
//import SmartContractName from '../abis/SmartContractName';

class App extends Component {

  //life cycle method to loadWeb3 and connect blockchain to react
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }
  //check if the browser is Ethereum enabled
  async loadWeb3(){
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
  else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)    
    }
  else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }
  //Connect blochchain and react
  async loadBlockchainData(){
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({account: accounts[0]})

    const networkId = await web3.eth.net.getId()
    //replace SmartContractName
    const networkData = Basic.networks[networkId]
    
    if(networkData){
      const abi = Basic.abi
      const address = networkData.address
      
      const Contract = new web3.eth.Contract(abi, address)
      this.setState({ Contract:Contract })
      
    }
    else{
      window.alert('Smart contract is not deployed to blockchain.')
    }
  }
  //constructor 
  constructor(props){
    super(props)
    this.state={
      name: '',
      contract: null,
    }
  }
  render(){
    return(
    <div>
      <h1 className="text-red-500 text-4xl text-center bg-green-300">
        Code Here! {this.state.name}
      </h1>
    </div>
    )
  }
}

export default App;
