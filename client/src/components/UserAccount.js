import React, { Component } from 'react';
import { Card, Grid, Message, Image } from 'semantic-ui-react';
import '../App.css';
import img from '../img/user.webp';

class UserAccount extends Component {

    render() {
        return (
            <div className='user-account'>
                <Grid centered stackable>
                    <Grid.Row>
                        <Grid.Column>
                            <Card fluid>
                                <Image
                                    src = {img} alt='image'
                                    wrapped ui={false}
                                />
                                <Card.Content>
                                    <Card.Header>{this.props.username}</Card.Header>
                                    <Card.Meta>
                                        <span>USER</span>
                                    </Card.Meta>
                                    <Card.Description>
                                        <strong>
                                            {
                                                this.props.username.charAt(0).toUpperCase() +
                                                this.props.username.toLowerCase().slice(1)
                                            }
                                        </strong> is a Web Developer and Blockchain Developer living in Odisha, India.
                                        <br></br>
                                        <a href='https://www.linkedin.com/in/kirti-mahapatra-1020a520b/' target='blank'>
                                            LinkedIn Profile
                                        </a>
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Message size='mini'>
                                        {this.props.account.toLowerCase()}
                                    </Message>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </div>
        );
    }
}

export default UserAccount;
