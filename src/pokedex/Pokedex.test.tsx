import {configure, fireEvent, render, waitFor} from "@testing-library/react";
import Pokemon from "../model/Pokemon";
import pokedexService from "../services/PokedexService";
import Pokedex from "./Pokedex";

configure({testIdAttribute: 'id'});
const renderPokedex = (props: Partial<any> = {}) => {
    const defaultProps = {
    };
    return render(<Pokedex {...defaultProps} {...props}/>);
}

describe("<Pokedex />", () => {
    test("should start closed", async () => {
        const element = renderPokedex();
        expect(element.container.getElementsByClassName("cover").length).toBe(1);
    });

    test("should open cover", async () => {
        const element = renderPokedex();
        fireEvent.click(element.container.getElementsByClassName("arrow-right-border")[0]);
        expect(element.container.getElementsByClassName("cover").length).toBe(0);
        expect(element.container.getElementsByClassName("selector-panel-wrapper").length).toBe(1);
        expect(element.container.getElementsByClassName("screen-container").length).toBe(1);
    });

    test("should start off", async () => {
        const element = renderPokedex();
        fireEvent.click(element.container.getElementsByClassName("arrow-right-border")[0]);
        expect(element.container.getElementsByClassName("screen off").length).toBe(1);
        expect(element.container.getElementsByClassName("dex-display gray large")[0].textContent).toBe("");
    });

    test("should turn on", async () => {
        const element = renderPokedex();
        fireEvent.click(element.container.getElementsByClassName("arrow-right-border")[0]);
        fireEvent.click(element.container.getElementsByClassName("rounded")[0]);
        expect(element.container.getElementsByClassName("screen on").length).toBe(1);
        expect(element.container.getElementsByClassName("dex-display gray large")[0].textContent).toBe("___");
    });

    test("turn on turn off switch should reset state", async () => {
        const element = renderPokedex();
        fireEvent.click(element.container.getElementsByClassName("arrow-right-border")[0]);
        fireEvent.click(element.container.getElementsByClassName("rounded")[0]);
        expect(element.container.getElementsByClassName("screen on").length).toBe(1);
        fireEvent.click(element.getAllByText("1")[0]);
        expect(element.container.getElementsByClassName("dex-display gray large")[0].textContent).toBe("__1");
        fireEvent.click(element.container.getElementsByClassName("poke-button square green")[0]);
        fireEvent.click(element.container.getElementsByClassName("rounded")[0]);
        expect(element.container.getElementsByClassName("screen off").length).toBe(1);
        fireEvent.click(element.container.getElementsByClassName("rounded")[0]);
        expect(element.container.getElementsByClassName("screen on").length).toBe(1);
        expect(element.container.getElementsByClassName("dex-display gray large")[0].textContent).toBe("___");
    })

    test("should turn on", async () => {
        const pokemon = {
            number: 25,
            name: 'Pikachu',
            image: ''
        };
        const mock = jest.spyOn(pokedexService, 'fetchPokemonById');
        mock.mockResolvedValue(pokemon);

        const element = renderPokedex();
        fireEvent.click(element.container.getElementsByClassName("arrow-right-border")[0]);
        fireEvent.click(element.container.getElementsByClassName("rounded")[0]);
        fireEvent.click(element.getAllByText("2")[0]);
        fireEvent.click(element.getAllByText("5")[0]);
        fireEvent.click(element.container.getElementsByClassName("poke-button square green")[0]);
        expect(mock).toBeCalledTimes(1);
        await waitFor(() => {
            expect(element.container.getElementsByClassName("pokemon-view")[0].textContent).toBe('Pikachu');
        });
    });
    
    test("should go to next", async () => {
        const pokemon = {
            number: 25,
            name: 'Pikachu',
            image: ''
        };
        const nextPokemon = {
            number: 26,
            name: 'Raichu',
            image: ''
        };
        const mock = jest.spyOn(pokedexService, 'fetchPokemonById');
        mock.mockResolvedValueOnce(pokemon);
        mock.mockResolvedValueOnce(nextPokemon);

        const element = renderPokedex();
        fireEvent.click(element.container.getElementsByClassName("arrow-right-border")[0]);
        fireEvent.click(element.container.getElementsByClassName("rounded")[0]);
        fireEvent.click(element.getAllByText("2")[0]);
        fireEvent.click(element.getAllByText("5")[0]);
        fireEvent.click(element.container.getElementsByClassName("poke-button square green")[0]);
        await waitFor(() => {
            expect(element.container.getElementsByClassName("pokemon-view")[0].textContent).toBe('Pikachu');
        });
        fireEvent.click(element.container.getElementsByClassName("right")[0]);
        await waitFor(() => {
            expect(element.container.getElementsByClassName("pokemon-view")[0].textContent).toBe('Raichu');
            expect(mock).toBeCalledTimes(2);
            expect(mock).toHaveBeenNthCalledWith(2, 26);
        });
    });

    test("should go to previous", async () => {
        const pokemon = {
            number: 25,
            name: 'Pikachu',
            image: ''
        };
        const previousPokemon = {
            number: 24,
            name: 'Arbok',
            image: ''
        };
        const mock = jest.spyOn(pokedexService, 'fetchPokemonById');
        mock.mockResolvedValueOnce(pokemon);
        mock.mockResolvedValueOnce(previousPokemon);

        const element = renderPokedex();
        fireEvent.click(element.container.getElementsByClassName("arrow-right-border")[0]);
        fireEvent.click(element.container.getElementsByClassName("rounded")[0]);
        fireEvent.click(element.getAllByText("2")[0]);
        fireEvent.click(element.getAllByText("5")[0]);
        fireEvent.click(element.container.getElementsByClassName("poke-button square green")[0]);
        await waitFor(() => {
            expect(element.container.getElementsByClassName("pokemon-view")[0].textContent).toBe('Pikachu');
        });
        fireEvent.click(element.container.getElementsByClassName("left")[0]);
        await waitFor(() => {
            expect(element.container.getElementsByClassName("pokemon-view")[0].textContent).toBe('Arbok');
            expect(mock).toBeCalledTimes(2);
            expect(mock).toHaveBeenNthCalledWith(2, 24);
        });
    });

    test("should not go to zero when pokemon is selected", async () => {
        const pokemon = {
            number: 1,
            name: 'Bulbasaur',
            image: ''
        };
        const none = {
            number: 0,
            name: 'Should Not Exist',
            image: ''
        };
        const mock = jest.spyOn(pokedexService, 'fetchPokemonById');
        mock.mockResolvedValueOnce(pokemon);
        mock.mockResolvedValueOnce(none);

        const element = renderPokedex();
        fireEvent.click(element.container.getElementsByClassName("arrow-right-border")[0]);
        fireEvent.click(element.container.getElementsByClassName("rounded")[0]);
        fireEvent.click(element.getAllByText("1")[0]);
        fireEvent.click(element.container.getElementsByClassName("poke-button square green")[0]);
        await waitFor(() => {
            expect(element.container.getElementsByClassName("pokemon-view")[0].textContent).toBe('Bulbasaur');
        });
        fireEvent.click(element.container.getElementsByClassName("left")[0]);
        expect(mock).toBeCalledTimes(1);
        expect(element.container.getElementsByClassName("pokemon-view")[0].textContent).toBe('Bulbasaur');
        expect(element.container.getElementsByClassName("dex-display gray large")[0].textContent).toBe("__1");
    });

    test("should not go to more than 151 when pokemon is selected", async () => {
        const pokemon = {
            number: 151,
            name: 'Mew',
            image: ''
        };
        const none = {
            number: 152,
            name: 'Should Not Exist',
            image: ''
        };
        const mock = jest.spyOn(pokedexService, 'fetchPokemonById');
        mock.mockResolvedValueOnce(pokemon);
        mock.mockResolvedValueOnce(none);

        const element = renderPokedex();
        fireEvent.click(element.container.getElementsByClassName("arrow-right-border")[0]);
        fireEvent.click(element.container.getElementsByClassName("rounded")[0]);
        fireEvent.click(element.getAllByText("1")[0]);
        fireEvent.click(element.getAllByText("5")[0]);
        fireEvent.click(element.getAllByText("1")[0]);
        fireEvent.click(element.container.getElementsByClassName("poke-button square green")[0]);
        await waitFor(() => {
            expect(element.container.getElementsByClassName("pokemon-view")[0].textContent).toBe('Mew');
        });
        fireEvent.click(element.container.getElementsByClassName("right")[0]);
        expect(mock).toBeCalledTimes(1);
        expect(element.container.getElementsByClassName("pokemon-view")[0].textContent).toBe('Mew');
        expect(element.container.getElementsByClassName("dex-display gray large")[0].textContent).toBe("151");
    });

    test("should fetch pokemon list and show on display", async () => {
        const list:Array<Pokemon> = [
            {number:1, name: "Bulbasaur", image: ""},
            {number:2, name: "Ivysaur", image: ""},
            {number:3, name: "Venusaur", image: ""},
            {number:4, name: "Charmander", image: ""},
            {number:5, name: "Chameleon", image: ""},
            {number:6, name: "Charizard", image: ""},
            {number:7, name: "Squirtle", image: ""},
        ];

        const mock = jest.spyOn(pokedexService, 'fetchPokemonList');
        mock.mockResolvedValueOnce(list);
        
        const element = renderPokedex();
        fireEvent.click(element.container.getElementsByClassName("arrow-right-border")[0]);
        fireEvent.click(element.container.getElementsByClassName("rounded")[0]);
        fireEvent.click(element.container.getElementsByClassName("poke-button square green")[0]);
        
        expect(mock).toBeCalledTimes(1);
        await waitFor(() => {
            expect(element.container.getElementsByClassName("pokemon-list-view").length).toBe(1);
        });

        expect(element.getByTestId('pokemon-list-1').textContent).toBe('1.Bulbasaur');
        expect(element.getByTestId('pokemon-list-2').textContent).toBe('2.Ivysaur');
        expect(element.getByTestId('pokemon-list-3').textContent).toBe('3.Venusaur');
        expect(element.getByTestId('pokemon-list-4').textContent).toBe('4.Charmander');
        expect(element.getByTestId('pokemon-list-5').textContent).toBe('5.Chameleon');
        expect(element.getByTestId('pokemon-list-6').textContent).toBe('6.Charizard');
        
        expect(element.queryByTestId('pokemon-list-7')).toBeNull();
        expect(element.getByTestId('pokemon-list-1').classList).toContain('selected-pokemon-item');
    });

    test("should navigate though list", async () => {
        const list:Array<Pokemon> = [
            {number:1, name: "Bulbasaur", image: ""},
            {number:2, name: "Ivysaur", image: ""},
            {number:3, name: "Venusaur", image: ""},
            {number:4, name: "Charmander", image: ""},
            {number:5, name: "Chameleon", image: ""},
            {number:6, name: "Charizard", image: ""},
            {number:7, name: "Squirtle", image: ""},
        ];

        const mock = jest.spyOn(pokedexService, 'fetchPokemonList');
        mock.mockResolvedValueOnce(list);
        
        const element = renderPokedex();
        fireEvent.click(element.container.getElementsByClassName("arrow-right-border")[0]);
        fireEvent.click(element.container.getElementsByClassName("rounded")[0]);
        fireEvent.click(element.container.getElementsByClassName("poke-button square green")[0]);
        
        expect(mock).toBeCalledTimes(1);
        await waitFor(() => {
            expect(element.container.getElementsByClassName("pokemon-list-view").length).toBe(1);
        });
        
        fireEvent.click(element.container.getElementsByClassName("poke-button arrow down")[0]);
        fireEvent.click(element.container.getElementsByClassName("poke-button arrow down")[0]);
        expect(element.getByTestId('pokemon-list-3').classList).toContain('selected-pokemon-item');

        fireEvent.click(element.container.getElementsByClassName("poke-button arrow up")[0]);
        expect(element.getByTestId('pokemon-list-2').classList).toContain('selected-pokemon-item');
    });

    test("should fetch selected on list", async () => {
        const list:Array<Pokemon> = [
            {number:1, name: "Bulbasaur", image: ""},
            {number:2, name: "Ivysaur", image: ""},
            {number:3, name: "Venusaur", image: ""},
            {number:4, name: "Charmander", image: ""},
            {number:5, name: "Chameleon", image: ""},
            {number:6, name: "Charizard", image: ""},
            {number:7, name: "Squirtle", image: ""},
        ];

        const mockFetchList = jest.spyOn(pokedexService, 'fetchPokemonList');
        mockFetchList.mockResolvedValueOnce(list);

        const mockFetchPokemon = jest.spyOn(pokedexService, 'fetchPokemonById');
        mockFetchPokemon.mockResolvedValueOnce(list[2]);

        const element = renderPokedex();
        fireEvent.click(element.container.getElementsByClassName("arrow-right-border")[0]);
        fireEvent.click(element.container.getElementsByClassName("rounded")[0]);
        fireEvent.click(element.container.getElementsByClassName("poke-button square green")[0]);
        
        expect(mockFetchList).toBeCalledTimes(1);
        await waitFor(() => {
            expect(element.container.getElementsByClassName("pokemon-list-view").length).toBe(1);
        });
        
        fireEvent.click(element.container.getElementsByClassName("poke-button arrow down")[0]);
        fireEvent.click(element.container.getElementsByClassName("poke-button arrow down")[0]);
        fireEvent.click(element.container.getElementsByClassName("poke-button square green")[0]);
        expect(mockFetchPokemon).toBeCalledWith(3);
    });

    test("should go to next page", async () => {
        const list:Array<Pokemon> = [
            {number:1, name: "Bulbasaur", image: ""},
            {number:2, name: "Ivysaur", image: ""},
            {number:3, name: "Venusaur", image: ""},
            {number:4, name: "Charmander", image: ""},
            {number:5, name: "Chameleon", image: ""},
            {number:6, name: "Charizard", image: ""},
            {number:7, name: "Squirtle", image: ""},
        ];

        const mockFetchList = jest.spyOn(pokedexService, 'fetchPokemonList');
        mockFetchList.mockResolvedValueOnce(list);

        const mockFetchPokemon = jest.spyOn(pokedexService, 'fetchPokemonById');
        mockFetchPokemon.mockResolvedValueOnce(list[2]);

        const element = renderPokedex();
        fireEvent.click(element.container.getElementsByClassName("arrow-right-border")[0]);
        fireEvent.click(element.container.getElementsByClassName("rounded")[0]);
        fireEvent.click(element.container.getElementsByClassName("poke-button square green")[0]);
        
        expect(mockFetchList).toBeCalledTimes(1);
        await waitFor(() => {
            expect(element.container.getElementsByClassName("pokemon-list-view").length).toBe(1);
        });
        
        fireEvent.click(element.container.getElementsByClassName("poke-button arrow down")[0]);
        fireEvent.click(element.container.getElementsByClassName("poke-button arrow down")[0]);
        fireEvent.click(element.container.getElementsByClassName("poke-button arrow down")[0]);
        fireEvent.click(element.container.getElementsByClassName("poke-button arrow down")[0]);
        fireEvent.click(element.container.getElementsByClassName("poke-button arrow down")[0]);
        fireEvent.click(element.container.getElementsByClassName("poke-button arrow down")[0]);
        fireEvent.click(element.container.getElementsByClassName("poke-button arrow down")[0]);
        expect(element.getByTestId('pokemon-list-7').classList).toContain('selected-pokemon-item');
    });


});