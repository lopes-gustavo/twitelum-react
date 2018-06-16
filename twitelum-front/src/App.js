import React, {Component, Fragment} from 'react';
import Cabecalho from './components/Cabecalho/index'
import NavMenu from './components/NavMenu/index'
import Dashboard from './components/Dashboard/index'
import Widget from './components/Widget/index'
import TrendsArea from './components/TrendsArea/index'
import Tweet from './components/Tweet/index'

class App extends Component {
    constructor() {
        super();

        this.state = {
            novoTweet: "",
            tweets: [''],
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();

        this.setState({
            tweets: [this.state.novoTweet, ...this.state.tweets],
            novoTweet: '',
        });
    }

    render() {
        return (
            <Fragment>
                <Cabecalho>
                    <NavMenu usuario="@omariosouto"/>
                </Cabecalho>
                <div className="container">
                    <Dashboard>
                        <Widget>
                            <form className="novoTweet" onSubmit={this.onSubmit}>
                                <div className="novoTweet__editorArea">
                                    <span className={`novoTweet__status ${
                                        this.state.novoTweet.length > 140
                                            ? 'novoTweet__status--invalido'
                                            : ''
                                        }
                                    `}>{ this.state.novoTweet.length }/140</span>
                                    <textarea className="novoTweet__editor"
                                              placeholder="O que está acontecendo?"
                                              value={this.state.novoTweet}
                                              onChange={ (event) => { this.setState({novoTweet: event.target.value })} }
                                    ></textarea>
                                </div>
                                <button type="submit" disabled={ this.state.novoTweet.length > 140 } className="novoTweet__envia">Tweetar</button>
                            </form>
                        </Widget>
                        <Widget>
                            <TrendsArea/>
                        </Widget>
                    </Dashboard>
                    <Dashboard posicao="centro">
                        <Widget>
                            <div className="tweetsArea">
                                {
                                    this.state.tweets.map((text, index) => {
                                        return <Tweet key={index} texto={text}/>
                                    })
                                }
                            </div>
                        </Widget>
                    </Dashboard>
                </div>
            </Fragment>
        );
    }
}

export default App;
