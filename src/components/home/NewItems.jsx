import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import { useState, useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import ExpiryTime from "../ExpiryTime";
import "aos/dist/aos.css";

const fetchUrl =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";

const NewItems = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    const { data } = await axios.get(fetchUrl);
    setNfts(data);
    setLoading(false);
  }
  useEffect(() => {
    fetchData();
  }, []);

  const settings = {
    margin: 30,
    responsiveClass: true,
    items: 4,
    nav: true,
    autoplay: false,
    navText: ["<", ">"],
    smartSpeed: 500,
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      600: {
        items: 2,
      },
      700: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {!loading ? (
            <OwlCarousel className="slider-items owl-carousel" {...settings}>
              {new Array(4).fill(0).map((_, index) => (
                <div
                  className=""
                  data-aos="fade-in"
                  data-aos-delay="200"
                  key={index}
                >
                  <div className="nft__item" key={index}>
                    <div className="nft__item_wrap">
                      <Skeleton width={330} height={330} borderRadius={5} />
                    </div>
                    <div className="nft__item_info">
                      <Skeleton width={120} height={36} borderRadius={5} />
                      <div className="nft__item_price">
                        <Skeleton width={100} height={24} borderRadius={5} />
                      </div>
                      <div className="nft__item_like">
                        <span>
                          <Skeleton width={36} height={26} borderRadius={5} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          ) : (
            <OwlCarousel className="slider-items owl-carousel" {...settings}>
              {nfts.map((nft, index) => (
                <div
                  className=""
                  data-aos="fade-in"
                  data-aos-delay="200"
                  key={index}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${nft.authorId}`}
                        title="Creator: Monica Lucas"
                      >
                        <img className="lazy" src={nft.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    {nft.expiryDate && (
                      <ExpiryTime expiryTime={nft.expiryDate} />
                    )}

                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <Link to={`/item-details/${nft.nftId}`}>
                        <img
                          src={nft.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to={`/item-details/${nft.nftId}`}>
                        <h4>{nft.title}</h4>
                      </Link>
                      <div className="nft__item_price">{nft.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{nft.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
