import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const [nfts, setNfts] = useState([]);
  const { nftId } = useParams();
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
    );
    setLoading(false);
    setNfts(data);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [nftId]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {loading.nfts ? (
                <>
                  <div className="col-md-6 text-center">
                    <Skeleton width="100%" height="100%" />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <Skeleton width={300} height={40} />

                      <div className="item_info_counts">
                        <Skeleton width={80} height={30} />
                        <Skeleton width={80} height={30} />
                      </div>
                      <Skeleton width="100%" height="80%" />
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Skeleton
                                width="50px"
                                height="50px"
                                borderRadius="50%"
                              />
                            </div>
                            <div className="author_list_info">
                              <Skeleton width={125} height={20} />
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Skeleton
                                width="50px"
                                height="50px"
                                borderRadius={50}
                              />
                            </div>
                            <div className="author_list_info">
                              <Skeleton width={125} height={20} />
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <div className="nft-item-price">
                          <Skeleton width={75} height={20} borderRadius={1} />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="row">
                    <div className="col-md-6 text-center">
                      <img
                        src={nfts.nftImage}
                        className="img-fluid img-rounded mb-sm-30 nft-image"
                        alt=""
                      />
                    </div>
                    <div className="col-md-6">
                      <div className="item_info">
                        <h2>
                          {nfts.title} #{nfts.tag}
                        </h2>

                        <div className="item_info_counts">
                          <div className="item_info_views">
                            <i className="fa fa-eye"></i>
                            {nfts.views}
                          </div>
                          <div className="item_info_like">
                            <i className="fa fa-heart"></i>
                            {nfts.likes}
                          </div>
                        </div>
                        <p>{nfts.description}</p>
                        <div className="d-flex flex-row">
                          <div className="mr40">
                            <h6>Owner</h6>
                            <div className="item_author">
                              <div className="author_list_pp">
                                <Link to={`/author/${nfts.ownerId}`}>
                                  <img
                                    className="lazy"
                                    src={nfts.ownerImage}
                                    alt=""
                                  />
                                  <i className="fa fa-check"></i>
                                </Link>
                              </div>
                              <div className="author_list_info">
                                <Link to={`/author/${nfts.ownerId}`}>
                                  {nfts.ownerName}
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div></div>
                        </div>
                        <div className="de_tab tab_simple">
                          <div className="de_tab_content">
                            <h6>Creator</h6>
                            <div className="item_author">
                              <div className="author_list_pp">
                                <Link to={`/author/${nfts.creatorId}`}>
                                  <img
                                    className="lazy"
                                    src={nfts.creatorImage}
                                    alt=""
                                  />
                                  <i className="fa fa-check"></i>
                                </Link>
                              </div>
                              <div className="author_list_info">
                                <Link to={`/author/${nfts.creatorId}`}>
                                  {nfts.creatorName}
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="spacer-40"></div>
                          <h6>Price</h6>
                          <div className="nft-item-price">
                            <img src={EthImage} alt="" />
                            <span>{nfts.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
