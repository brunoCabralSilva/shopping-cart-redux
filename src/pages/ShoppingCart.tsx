import React from "react";
import { useSelector } from "react-redux";
import { useSlice } from "../redux/slice";

export default function ShoppingCart() {
  const slice = useSelector(useSlice);

  interface IList {
    permalink: string;
    thumbnail: string;
    title: string;
    price: string;
    seller: { nickname: string };
  };


  return(
    <div className="w-full bg-gray-100">
      <div className="relative h-45vh">
        <img
          className="h-45vh w-full object-cover object-top absolute"
          src={ require('../images/loja-virtual.png') }
          alt="loja virtual"
        />
        <div className="ml-6 flex justify-center h-full flex-col">
          <p className="z-50 relative text-9xl texto">CellTech</p>
        </div>
      </div>
      <div className="mt-3 text-4xl ml-8">Shopping Cart</div>
      <div className="m-6 grid grid-cols-3 gap-2">
      {
          slice.list.map((item: IList, index: number) => (
            <div key={ index } className="flex border p-4 bg-white rounded-xl drop-shadow-sm hover:drop-shadow-lg transition duration-400">
              <div className="bg-white h-full w-36 flex items-center rounded-full border">
                <img
                  src={ item.thumbnail }
                  className="w-full object-contain rounded-full"
                  alt={ item.title }
                />
              </div>
              <div className="pl-4 relative">
                <p className="font-bold">{ item.title }</p>
                <a className="text-sm" href={ item.permalink }>{ item.seller.nickname }</a>
                <div className="flex flex-col py-2">
                  <p> <span>{`R$ ${ item.price }`}</span>
                  </p>
                </div>
              </div>
            </div>
          ))
        }
    </div>
    </div>
  )
}