import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Navbar({account}) {
  return (
    <div className="navbar">
      <Link href={"/"}>
        <Image src={"/Disney.png"} alt="logo" width={99} height={42} />
      </Link>
      <div className="account-info ">
        <p>Welcome {account.username}</p>
        <img className="avatar" src={account.avatar. url}/>
      </div>
    </div>
  );
}

export default Navbar