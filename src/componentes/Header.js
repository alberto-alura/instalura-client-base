import React, { Component } from 'react';
import PubSub from 'pubsub-js';


export default class Header extends Component {

  busca(event){
    event.preventDefault();
		fetch(`http://localhost:8080/api/public/fotos/${this.login.value}`)
			.then(response => {
				return response.json();
			})
			.then(fotos => {				
				PubSub.publish('timeline',{fotos})
			});    
  }

	render(){
		return(         
		<header className="header container">
          <h1 className="header-logo">
            Instalura
          </h1>

          <form className="header-busca" onSubmit={this.busca.bind(this)}>
            <input type="text" name="search" placeholder="Pesquisa" className="header-busca-campo" ref={(input) => {               
              this.login = input; 
            }}/>
            <input type="submit" value="Buscar" className="header-busca-submit"/>
          </form>


          <nav>
            <ul className="header-nav">
              <li className="header-nav-item">
                <a href="#">
                  ♡
                  {/**                 ♥**/}
                  {/** Quem deu like nas minhas fotos?**/}
                </a>
              </li>
            </ul>
          </nav>
        </header>);		
	}
}