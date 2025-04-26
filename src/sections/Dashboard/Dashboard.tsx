import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { SlideSection } from '../../components/Slider'
import { GAMES } from '../../games'
import { GameCard } from './GameCard'
import { WelcomeBanner } from './WelcomeBanner'

export function GameSlider() {
  return (
    <SlideSection>
      {GAMES.map((game) => (
        <div key={game.id} style={{ width: '160px', display: 'flex' }}>
          <GameCard game={game} />
        </div>
      ))}
    </SlideSection>
  )
}

const Grid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  @media (min-width: 600px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (min-width: 800px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`

const PriceBox = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 12px;
  border-radius: 16px;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 16px;
  z-index: 1000;

  .price {
    display: flex;
    align-items: center;
    gap: 6px;

    img {
      width: 16px;
      height: 16px;
    }
  }

  .price-up {
    color: #4ade80;
  }

  .price-down {
    color: #f87171;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`

const BottomImage = styled.div`
  position: fixed;
  bottom: 10px;
  left: 10px;
  z-index: 500;
  
  img {
    width: 150px;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`

export function GameGrid() {
  return (
    <Grid>
      {GAMES.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </Grid>
  )
}

export default function Dashboard() {
  const [solanaPrice, setSolanaPrice] = useState<number | null>(null)
  const [bonkPrice, setBonkPrice] = useState<number | null>(null)
  const [solanaChange, setSolanaChange] = useState<number>(0)
  const [bonkChange, setBonkChange] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const [solRes, bonkRes] = await Promise.all([
          fetch('https://api.coingecko.com/api/v3/coins/solana'),
          fetch('https://api.coingecko.com/api/v3/coins/bonk')
        ])

        const solData = await solRes.json()
        const bonkData = await bonkRes.json()

        const solPrice = parseFloat(solData.market_data.current_price.usd)
        const solChange = parseFloat(solData.market_data.price_change_percentage_24h)
        const bonkPrice = parseFloat(bonkData.market_data.current_price.usd)
        const bonkChange = parseFloat(bonkData.market_data.price_change_percentage_24h)

        if (!isNaN(solPrice)) setSolanaPrice(solPrice)
        if (!isNaN(solChange)) setSolanaChange(solChange)
        if (!isNaN(bonkPrice)) setBonkPrice(bonkPrice)
        if (!isNaN(bonkChange)) setBonkChange(bonkChange)

        setLoading(false)
      } catch (err) {
        console.error('Error fetching prices:', err)
        setLoading(false)
      }
    }

    fetchPrices()
    const interval = setInterval(fetchPrices, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ marginTop: '2rem' }}>
      <WelcomeBanner />
      <GameGrid />
      {!loading && solanaPrice !== null && bonkPrice !== null && (
        <PriceBox>
          <div className="price">
            <img src="https://assets.coingecko.com/coins/images/4128/small/solana.png" alt="SOL" />
            ${solanaPrice.toFixed(2)}
            <span className={solanaChange >= 0 ? 'price-up' : 'price-down'}>
              {solanaChange >= 0 ? '↑' : '↓'}{Math.abs(solanaChange).toFixed(2)}%
            </span>
          </div>
          <div className="price">
            <img src="/bonk.png" alt="BONK" style={{ width: 16, height: 16 }} />
            ${bonkPrice.toFixed(6)}
            <span className={bonkChange >= 0 ? 'price-up' : 'price-down'}>
              {bonkChange >= 0 ? '↑' : '↓'}{Math.abs(bonkChange).toFixed(2)}%
            </span>
          </div>
        </PriceBox>
      )}

      {/* Bottom left image */}
      <BottomImage>
        <img src="/b.png" alt="Bonkin" />
      </BottomImage>
    </div>
  )
}
