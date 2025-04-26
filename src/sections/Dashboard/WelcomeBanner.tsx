import React, { useState } from 'react';
import styled from 'styled-components';
import { Copy } from 'lucide-react';

const Hero = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 40px 20px;
  text-align: center;

  h1 {
    font-size: 3.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1rem;
    margin-top: 1rem;
  }

  & > div {
    padding: 0px;
  }

  @media (min-width: 800px) {
    padding: 60px 20px;
    
    h1 {
      font-size: 7rem;
      margin-bottom: 0rem;
      margin-top: 0rem;
    }
    
    p {
      font-size: 1rem;
      margin-top: 0;
    }
  }
`;

const Badge = styled.div`
  background: #ff9f1c;
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 10px 18px; /* More padding inside */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  white-space: nowrap;
  gap: 8px; /* Space between icon and text */
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;

  &:hover {
    transform: scale(1.05); /* Slight scale effect on hover */
    background: #ff9f1c;
  }

  span {
    padding: 0 10px; /* Adds space inside around text */
    display: inline-block;
  }
`;

export function WelcomeBanner() {
  const [address] = useState("XXXXXXXXXXXXXXXX"); // Replace with real value

  const getAbbreviatedAddress = (address: string | any[]) => {
    return `${address.slice(0, 3)}...${address.slice(-3)}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
  };

  return (
    <Hero>
      <Badge onClick={copyToClipboard}>
        <span>
          <Copy size={12} />
          <span>{getAbbreviatedAddress(address)}</span>
        </span>
      </Badge>
      <div>
        <h1>Bonkasino</h1>
        <p>Instant on-chain gambling. Best odds right from your wallet</p>
      </div>
    </Hero>
  );
}