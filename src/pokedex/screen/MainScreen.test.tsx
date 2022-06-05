import { configure, render } from "@testing-library/react";
import Pokemon from "../../model/Pokemon";
import MainScreen from "./MainScreen";

const renderMainScreen = (props: Partial<any> = {}) => {
    const defaultProps = {
        selectedPokemon: undefined,
        on: false,
    };

    return render(<MainScreen {...defaultProps} {...props}/>);
}

configure({testIdAttribute: 'id'});

describe("<MainScreen />", () => {

    test("should be turned off", async () => {
        const element = renderMainScreen();
        expect(element.container.getElementsByClassName("screen off").length).toBe(1);
        expect(element.container.getElementsByClassName("screen on").length).toBe(0);
    });

    test("should be turned off", async () => {
        const element = renderMainScreen({on:true});
        expect(element.container.getElementsByClassName("screen off").length).toBe(0);
        expect(element.container.getElementsByClassName("screen on").length).toBe(1);
    });

    test("should have pokemon view", async () => {
        const element = renderMainScreen({on:true, selectedPokemon: {number:1, name: "Bulbasaur", image: ""}});
        expect(element.container.getElementsByClassName("pokemon-view").length).toBe(1);
    });

    test("should have pokemon list", async () => {
        const list:Array<Pokemon> = [
            {number:1, name: "Bulbasaur", image: ""},
            {number:2, name: "Ivysaur", image: ""},
            {number:3, name: "Venusaur", image: ""},
        ];
        const element = renderMainScreen({on:true, selectedPokemon: list});
        expect(element.container.getElementsByClassName("pokemon-list-view").length).toBe(1);
        expect(element.getByTestId('pokemon-list-1').textContent).toBe('1.Bulbasaur');
        expect(element.getByTestId('pokemon-list-2').textContent).toBe('2.Ivysaur');
        expect(element.getByTestId('pokemon-list-3').textContent).toBe('3.Venusaur');
    });

    test("should have pokemon list with max 6 pokemons", async () => {
        const list:Array<Pokemon> = [
            {number:1, name: "Bulbasaur", image: ""},
            {number:2, name: "Ivysaur", image: ""},
            {number:3, name: "Venusaur", image: ""},
            {number:4, name: "Charmander", image: ""},
            {number:5, name: "Chameleon", image: ""},
            {number:6, name: "Charizard", image: ""},
            {number:7, name: "Squirtle", image: ""},
        ];
        const element = renderMainScreen({on:true, selectedPokemon: list});
        expect(element.container.getElementsByClassName("pokemon-list-view").length).toBe(1);
        expect(element.getByTestId('pokemon-list-1').textContent).toBe('1.Bulbasaur');
        expect(element.getByTestId('pokemon-list-2').textContent).toBe('2.Ivysaur');
        expect(element.getByTestId('pokemon-list-3').textContent).toBe('3.Venusaur');
        expect(element.getByTestId('pokemon-list-4').textContent).toBe('4.Charmander');
        expect(element.getByTestId('pokemon-list-5').textContent).toBe('5.Chameleon');
        expect(element.getByTestId('pokemon-list-6').textContent).toBe('6.Charizard');
        
        expect(element.queryByTestId('pokemon-list-7')).toBeNull();
    });
});