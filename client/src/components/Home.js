import React, { Component } from 'react';
import { Grid, Image } from 'semantic-ui-react';
import img from '../img/background6.jpeg';
import '../App.css';

class Home extends Component {
    render() {
        return (
            <div className='home-page'>
                <Grid stackable columns={2} textAlign='left'>
                    <Grid.Row width={3}>
                        <Grid.Column width={9}>
                            This is a demonstration of a Blockchain based authentication
                            where login information are not stored in a database, but the
                            hash resulting from login data is stored on a smart contract.
                            To authenticate users need an ethereum address, a username, a
                            password and a six digit code. The user must be connected to
                            the Blockchain before authentication since the web3 sign method
                            is used to generate a cryptographic signature necessary for
                            the generation of the user's login data hash.
                        </Grid.Column>
                        <Grid.Column width={1}>

                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Image src={img} alt='image' />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default Home;
