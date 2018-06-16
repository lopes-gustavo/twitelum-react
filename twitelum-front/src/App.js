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
			tweets: [],
		};

		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(event) {
		event.preventDefault();

		const novoTweet = this.state.novoTweet;

		fetch('http://localhost:3002/tweets', {
			method: 'POST',
			body: JSON.stringify({login: 'omariosouto', conteudo: novoTweet}),
		})
		.then(response => response.json())
		.then(tweet => {
			this.setState({
				tweets: [tweet, ...this.state.tweets],
				novoTweet: '',
			});
		});
	}

	componentDidMount() {
		fetch('http://localhost:3002/tweets')
		.then(response => response.json())
		.then(tweet => {
			this.setState({
				tweets: tweet,
			});
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
                                    `}>{this.state.novoTweet.length}/140</span>
									<textarea className="novoTweet__editor"
									          placeholder="O que está acontecendo?"
									          value={this.state.novoTweet}
									          onChange={(event) => { this.setState({novoTweet: event.target.value}) }}
									/>
								</div>
								<button type="submit" disabled={this.state.novoTweet.length > 140}
								        className="novoTweet__envia">Tweetar
								</button>
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
									this.state.tweets.map((tweet, index) => {
										return <Tweet key={index} tweet={tweet}/>
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
