import React from 'react';
import Web3 from 'web3';
import Web3Modal from 'web3modal';

interface State {
    web3: any;
    provider: any;
    account: string | null;
}

class Home extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            web3: null,
            provider: null,
            account: null
        };
    }

    connectWallet = async () => {
        try {
            if (!window.ethereum) {
                alert("Please install an Ethereum wallet first.");
                return;
            }

            if (window.ethereum.isMetaMask) {
                console.log("MetaMask is installed!");
            }

            const web3Modal = new Web3Modal();
            const provider = await web3Modal.connect();
            const web3 = new Web3(provider);
            const accounts = await web3.eth.getAccounts();
            this.setState({ web3, provider, account: accounts[0] });
        } catch (error) {
            if ((error as any).message === "User Rejected") {
                alert("Connection to Ethereum wallet was rejected by the user.");
            } else {
                console.error("An error occurred:", error);
            }
        }
    }

    disconnectWallet = async () => {
        if (this.state.provider && this.state.provider.close) {
            await this.state.provider.close();
        }
        this.setState({ web3: null, provider: null, account: null });
    }

    render() {
        return (
            <div className="container">
                <div>Welcome to My Personal Website!</div>
                <button onClick={this.connectWallet} className="myButton">Connect to Wallet</button>
                <button onClick={this.disconnectWallet} className="disconnectBtn">Disconnect</button>
                <div className="statusBar">
                    {this.state.account ? `Connected: ${this.state.account}` : "No wallet linked"}
                </div>
            </div>
        );
    }
}

export default Home;

