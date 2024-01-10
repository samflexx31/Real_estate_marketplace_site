import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import { Navigation } from "swiper/modules";
import ListingItem from "../components/ListingItem";

const Home = () => {
  const [offerListing, setOfferListing] = useState([]);
  const [saleListing, setSaleListing] = useState([]);
  const [rentListing, setRentListing] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(saleListing);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/server/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListing(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  const fetchRentListings = async () => {
    try {
      const res = await fetch("/server/listing/get?type=rent&limit=4");
      const data = await res.json();
      setRentListing(data);
      fetchSaleListings();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSaleListings = async () => {
    try {
      const res = await fetch("/server/listing/get?type=sale&limit=4");
      const data = await res.json();
      setSaleListing(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* top */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-slate-500">perfect</span> <br />{" "}
          place with ease
        </h1>

        <div className="text-gray-400 text-xl sm:text-sm">
          Flexx Estate is the best place to find your next perfect place to
          live. <br />
          We have a wide range of properties for you to choose from
        </div>
        <Link
          to={"/search"}
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
        >
          Let's get started...
        </Link>
      </div>
      <Swiper navigation>
        {/* swiper */}
        {offerListing &&
          offerListing.length > 0 &&
          offerListing.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[550px]"
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      {/* listing results for offer, sales and rent */}

      <div className="max-w-6xl mx-auto p3 flex flex-col gap-8 my-10">
        {offerListing && offerListing.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex gap-4 flex-wrap ">
              {offerListing.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListing && rentListing.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent Places for rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=rent"}
              >
                Show more places for rent
              </Link>
            </div>
            <div className="flex gap-4 flex-wrap  ">
              {rentListing.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListing && saleListing.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=sale"}
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex gap-4 flex-wrap ">
              {saleListing.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
