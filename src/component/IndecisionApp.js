import React from 'react';
import AddOption from './AddOption';
import Options from './Options';
import Action from './Action';
import Header from './Header';
import OptionModal from './OptionModal';

class IndecisionApp extends React.Component {

    state = {
        options : [],
        selectedOption : undefined
    }

    handleDeleteOptions = () => {
        this.setState(() => {({options : []})});
    }
    handleClearSelectedOption = () => {
        this.setState(() => (({
            selectedOption : undefined
        })));
    }
    handlePick = () => {
        const randomNumber = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNumber];
        this.setState(() => {
            return {
                selectedOption : option
            }
        });
    }
    handleAddOption = (option) => {
        if(!option) {
            return 'fuck off';
        } else if (this.state.options.indexOf(option) > -1) {
            return 'maar lunga';
        }
        this.setState((prevState) => {
            return {
                options : prevState.options.concat([option])
            }
        });
    }
    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options : prevState.options.filter((option) => option !== optionToRemove)
        }));
    }
    componentDidUpdate = (prevProps, prevState) => {
        if(prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }
    componentDidMount = () => {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if(options) {
                this.setState(() => ({options}));
            }
        } catch(e) {

        }
    }

    render() {
        const title = "Indecision App";
        const subtitle = "Put your life in the hands of a computer";
        return(
            <div>
                <Header title={title} subtitle={subtitle} />
                <div className="container">
                    <Action 
                        hasOptions={this.state.options.length > 0}
                        handlePick={this.handlePick}
                    />
                    <div className="widget">
                        <Options 
                            options = {this.state.options}
                            handleDeleteOptions={this.handleDeleteOptions}
                            handleDeleteOption = {this.handleDeleteOption}
                        />
                        <AddOption 
                            handleAddOption={this.handleAddOption}
                        />
                    </div>
                </div>
                <OptionModal 
                    selectedOption={this.state.selectedOption}
                    handleClearSelectedOption = {this.handleClearSelectedOption}
                />
            </div>
        );
    }
}

IndecisionApp.defaultProps = {
    options : []
}

export default IndecisionApp;
