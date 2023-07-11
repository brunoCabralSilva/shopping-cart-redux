import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addFavorite } from "../redux/slice";
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";

interface IList {
  permalink: string;
  thumbnail: string;
  title: string;
  price: string;
  seller: { nickname: string };
};

export default function Home() {
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=MLB1051`);
        const responseJson = await response.json();
        setList(responseJson.results);
        return responseJson;
      } catch (error) {
        return error;
      }
    };
    fetchItems();
  }, []);

  const returnWord = (word: string): string => {
    let newWord = '';
    for (let i = 0; i < word.length; i += 1) {
      if (newWord.length < 40) {
        newWord += word[i];
      }
    }
    if (word.length > 40) newWord += '...';
    return newWord;
  };

  return(
    <div className="w-full bg-gray-100">
      <div className="relative h-45vh">
        <AiOutlineShoppingCart
          onClick={ () => navigate('/shopping-cart') }
          className="fixed top-0 right-0 z-50 m-3 rounded-xl bg-white text-4xl p-1 cursor-pointer border border-black hover:bg-black hover:text-white transition-colors duration-300 hover:border-white" />
        <img
          className="h-45vh w-full object-cover object-top absolute"
          src={ require('../images/loja-virtual.png') }
          alt="loja virtual"
        />
        <div className="ml-6 flex items-center h-full">
          <p className="z-50 relative text-9xl texto">CellTech</p>
        </div>
      </div>
      <div className="m-6 grid grid-cols-3 gap-2">
        {
          list.map((item: IList, index) => (
            <div key={ index } className="flex border p-4 bg-white rounded-xl drop-shadow-sm hover:drop-shadow-lg transition duration-400">
              <div className="bg-white h-full w-36 flex items-center rounded-full border">
                <img
                  src={ item.thumbnail }
                  className="w-full object-contain rounded-full"
                  alt={ item.title }
                />
              </div>
              <div className="pl-4 relative">
                <p className="font-bold">{ returnWord(item.title) }</p>
                <a className="text-sm" href={ item.permalink }>{ item.seller.nickname }</a>
                <div className="flex flex-col py-2">
                  <p> <span>{`R$ ${ item.price }`}</span>
                  </p>
                </div>
                <button
                  onClick={ () => dispatch(addFavorite(item)) }
                  className="absolute bottom-0 right-0 border border-black py-1 px-3 rounded-full hover:bg-black hover:text-white transition-colors duration-300"
                >
                  +
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}