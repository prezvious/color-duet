import { useMemo, useRef, useState, type CSSProperties } from 'react'
import { Check, Copy, Palette, RotateCcw, Search } from 'lucide-react'
import './App.css'

type ColorPair = {
  id: string
  rank: number
  colorAName: string
  colorAHex: string
  colorBName: string
  colorBHex: string
  score: number
  type: string
}

type SortMode = 'rank' | 'score' | 'type'

const COLOR_PAIRS: ColorPair[] = [
  { id: '1-jade-taffy-meadow-3', rank: 1, colorAName: 'Jade', colorAHex: '#3B5016', colorBName: 'Taffy Meadow 3', colorBHex: '#EBE6C1', score: 100, type: 'Light + deep anchor' },
  { id: '2-olive-robin-orchard-1', rank: 2, colorAName: 'Olive', colorAHex: '#0F2411', colorBName: 'Robin Orchard 1', colorBHex: '#F2DCCF', score: 100, type: 'Light + deep anchor' },
  { id: '3-teal-green-petal-picnic-4', rank: 3, colorAName: 'Teal Green', colorAHex: '#071B16', colorBName: 'Petal Picnic 4', colorBHex: '#E7E4B6', score: 100, type: 'Light + deep anchor' },
  { id: '4-honey-milk-5-cantaloupe-tide-5', rank: 4, colorAName: 'Honey Milk 5', colorAHex: '#D8B389', colorBName: 'Cantaloupe Tide 5', colorBHex: '#C3E7EA', score: 100, type: 'Soft complementary' },
  { id: '5-emerald-peach-sorbet-4', rank: 5, colorAName: 'Emerald', colorAHex: '#091D14', colorBName: 'Peach Sorbet 4', colorBHex: '#EBE2C2', score: 100, type: 'Light + deep anchor' },
  { id: '6-forest-apricot-hush-2', rank: 6, colorAName: 'Forest', colorAHex: '#0F2D15', colorBName: 'Apricot Hush 2', colorBHex: '#F0DFCB', score: 100, type: 'Light + deep anchor' },
  { id: '7-berry-foam-1-meadow-cream-6', rank: 7, colorAName: 'Berry Foam 1', colorAHex: '#F4E0F2', colorBName: 'Meadow Cream 6', colorBHex: '#A9CD89', score: 99.8, type: 'Soft complementary' },
  { id: '8-moss-dewy-apricot-3', rank: 8, colorAName: 'Moss', colorAHex: '#323D12', colorBName: 'Dewy Apricot 3', colorBHex: '#ECDFC1', score: 99.6, type: 'Light + deep anchor' },
  { id: '9-aqua-whisper-6-soft-riviera-1', rank: 9, colorAName: 'Aqua Whisper 6', colorAHex: '#89CDC6', colorBName: 'Soft Riviera 1', colorBHex: '#F3DED3', score: 98.8, type: 'Soft complementary' },
  { id: '10-peach-cloud-4-sage-macaron-5', rank: 10, colorAName: 'Peach Cloud 4', colorAHex: '#E2AC9E', colorBName: 'Sage Macaron 5', colorBHex: '#C7EAE1', score: 98.7, type: 'Soft complementary' },
  { id: '11-berry-foam-3-butter-bloom-6', rank: 11, colorAName: 'Berry Foam 3', colorAHex: '#E3B6E0', colorBName: 'Butter Bloom 6', colorBHex: '#DEECD0', score: 98.7, type: 'Soft complementary' },
  { id: '12-sorbet-field-6-vanilla-rose-4', rank: 12, colorAName: 'Sorbet Field 6', colorAHex: '#C7EAE4', colorBName: 'Vanilla Rose 4', colorBHex: '#E2B6A0', score: 98.5, type: 'Soft complementary' },
  { id: '13-honey-milk-4-petal-canopy-6', rank: 13, colorAName: 'Honey Milk 4', colorAHex: '#E2C29E', colorBName: 'Petal Canopy 6', colorBHex: '#CFEDED', score: 98.2, type: 'Soft complementary' },
  { id: '14-powder-sky-5-lemon-cream-3', rank: 14, colorAName: 'Powder Sky 5', colorAHex: '#98BCD7', colorBName: 'Lemon Cream 3', colorBHex: '#EAE4B3', score: 97.6, type: 'Soft complementary' },
  { id: '15-berry-foam-4-apricot-garden-5', rank: 15, colorAName: 'Berry Foam 4', colorAHex: '#DAA1D6', colorBName: 'Apricot Garden 5', colorBHex: '#D4E8BF', score: 97.5, type: 'Soft complementary' },
  { id: '16-powder-sky-6-lemon-cream-4', rank: 16, colorAName: 'Powder Sky 6', colorAHex: '#89AFCD', colorBName: 'Lemon Cream 4', colorBHex: '#E2DB9E', score: 97.4, type: 'Soft complementary' },
  { id: '17-vanilla-rose-5-soft-riviera-5', rank: 17, colorAName: 'Vanilla Rose 5', colorAHex: '#D8A18B', colorBName: 'Soft Riviera 5', colorBHex: '#BDE5DD', score: 97.3, type: 'Soft complementary' },
  { id: '18-soft-marzipan-6-peach-sorbet-6', rank: 18, colorAName: 'Soft Marzipan 6', colorAHex: '#CDBB89', colorBName: 'Peach Sorbet 6', colorBHex: '#CCE6EB', score: 97.1, type: 'Soft complementary' },
  { id: '19-sky-pudding-4-honey-petals-4', rank: 19, colorAName: 'Sky Pudding 4', colorAHex: '#A6C6E2', colorBName: 'Honey Petals 4', colorBHex: '#E6E6B7', score: 96.7, type: 'Soft complementary' },
  { id: '20-blue-petal-4-pale-nectar-1', rank: 20, colorAName: 'Blue Petal 4', colorAHex: '#A8B9E1', colorBName: 'Pale Nectar 1', colorBHex: '#F3DBD3', score: 96.5, type: 'Soft complementary' },
  { id: '21-berry-foam-5-sakura-meadow-4', rank: 21, colorAName: 'Berry Foam 5', colorAHex: '#D08CCD', colorBName: 'Sakura Meadow 4', colorBHex: '#D5EAC3', score: 96.1, type: 'Soft complementary' },
  { id: '22-sky-pudding-5-peach-sorbet-5', rank: 22, colorAName: 'Sky Pudding 5', colorAHex: '#93B8D8', colorBName: 'Peach Sorbet 5', colorBHex: '#E4E4B4', score: 95.8, type: 'Soft complementary' },
  { id: '23-aqua-whisper-5-golden-dew-1', rank: 23, colorAName: 'Aqua Whisper 5', colorAHex: '#98D7D2', colorBName: 'Golden Dew 1', colorBHex: '#F4E4D7', score: 95.7, type: 'Soft complementary' },
  { id: '24-apricot-hush-5-flamingo-mint-6', rank: 24, colorAName: 'Apricot Hush 5', colorAHex: '#D7BA98', colorBName: 'Flamingo Mint 6', colorBHex: '#CFE9ED', score: 95.7, type: 'Soft complementary' },
  { id: '25-aqua-veil-6-dewy-apricot-2', rank: 25, colorAName: 'Aqua Veil 6', colorAHex: '#89CDC8', colorBName: 'Dewy Apricot 2', colorBHex: '#F0DFD0', score: 95.6, type: 'Soft complementary' },
  { id: '26-lavender-mist-4-sunwash-grove-4', rank: 26, colorAName: 'Lavender Mist 4', colorAHex: '#B0A8E1', colorBName: 'Sunwash Grove 4', colorBHex: '#CDE8BF', score: 95.3, type: 'Soft complementary' },
  { id: '27-blue-petal-1-primrose-whisper-6', rank: 27, colorAName: 'Blue Petal 1', colorAHex: '#DEE6F7', colorBName: 'Primrose Whisper 6', colorBHex: '#C4CD89', score: 95.2, type: 'Soft complementary' },
  { id: '28-buttercup-stream-5-apricot-hush-6', rank: 28, colorAName: 'Buttercup Stream 5', colorAHex: '#C3E7E9', colorBName: 'Apricot Hush 6', colorBHex: '#CDAD89', score: 95.0, type: 'Soft complementary' },
  { id: '29-vanilla-rose-6-rosewater-bay-5', rank: 29, colorAName: 'Vanilla Rose 6', colorAHex: '#CC8D77', colorBName: 'Rosewater Bay 5', colorBHex: '#BCE6DB', score: 95.0, type: 'Soft complementary' },
  { id: '30-lagoon-milk-6-taffy-meadow-2', rank: 30, colorAName: 'Lagoon Milk 6', colorAHex: '#89CDBB', colorBName: 'Taffy Meadow 2', colorBHex: '#F0DBD1', score: 94.8, type: 'Soft complementary' },
  { id: '31-lavender-mist-5-pastel-harvest-5', rank: 31, colorAName: 'Lavender Mist 5', colorAHex: '#9F98D7', colorBName: 'Pastel Harvest 5', colorBHex: '#CFE8BF', score: 94.6, type: 'Soft complementary' },
  { id: '32-sea-mint-6-coconut-citrus-1', rank: 32, colorAName: 'Sea Mint 6', colorAHex: '#89CDA0', colorBName: 'Coconut Citrus 1', colorBHex: '#F2E0CE', score: 94.4, type: 'Split-complement pastel' },
  { id: '33-blue-petal-5-peach-sorbet-1', rank: 33, colorAName: 'Blue Petal 5', colorAHex: '#98ABD7', colorBName: 'Peach Sorbet 1', colorBHex: '#F2D6CE', score: 93.9, type: 'Soft complementary' },
  { id: '34-soft-marzipan-5-rain-glass-2', rank: 34, colorAName: 'Soft Marzipan 5', colorAHex: '#D7C698', colorBName: 'Rain Glass 2', colorBHex: '#CBEAF0', score: 93.9, type: 'Soft complementary' },
  { id: '35-rain-glass-5-minted-peach-2', rank: 35, colorAName: 'Rain Glass 5', colorAHex: '#98CDD7', colorBName: 'Minted Peach 2', colorBHex: '#F1E4D0', score: 93.8, type: 'Soft complementary' },
  { id: '36-aloe-mist-6-pastel-harvest-2', rank: 36, colorAName: 'Aloe Mist 6', colorAHex: '#89CDAD', colorBName: 'Pastel Harvest 2', colorBHex: '#EFE3C8', score: 93.8, type: 'Split-complement pastel' },
  { id: '37-peach-cloud-3-dawn-lagoon-4', rank: 37, colorAName: 'Peach Cloud 3', colorAHex: '#EABFB2', colorBName: 'Dawn Lagoon 4', colorBHex: '#CAECE1', score: 93.7, type: 'Soft complementary' },
  { id: '38-sage-whisk-6-coral-meadow-1', rank: 38, colorAName: 'Sage Whisk 6', colorAHex: '#84C370', colorBName: 'Coral Meadow 1', colorBHex: '#F5D6DB', score: 93.7, type: 'Split-complement pastel' },
  { id: '39-rain-glass-6-cloudfruit-2', rank: 39, colorAName: 'Rain Glass 6', colorAHex: '#89C1CD', colorBName: 'Cloudfruit 2', colorBHex: '#F0E1CC', score: 93.6, type: 'Soft complementary' },
  { id: '40-powder-sky-4-butter-silk-3', rank: 40, colorAName: 'Powder Sky 4', colorAHex: '#A8C8E1', colorBName: 'Butter Silk 3', colorBHex: '#E9E6B9', score: 93.6, type: 'Soft complementary' },
  { id: '41-pale-nectar-6-apricot-hush-4', rank: 41, colorAName: 'Pale Nectar 6', colorAHex: '#D2EEEE', colorBName: 'Apricot Hush 4', colorBHex: '#E1C6A8', score: 93.6, type: 'Soft complementary' },
  { id: '42-lagoon-milk-5-cantaloupe-tide-1', rank: 42, colorAName: 'Lagoon Milk 5', colorAHex: '#98D7C6', colorBName: 'Cantaloupe Tide 1', colorBHex: '#F5E2DB', score: 93.4, type: 'Soft complementary' },
  { id: '43-mint-lace-6-apricot-garden-1', rank: 43, colorAName: 'Mint Lace 6', colorAHex: '#89CD92', colorBName: 'Apricot Garden 1', colorBHex: '#F4DCD2', score: 93.3, type: 'Split-complement pastel' },
  { id: '44-blush-linen-4-sakura-meadow-6', rank: 44, colorAName: 'Blush Linen 4', colorAHex: '#E1BBA8', colorBName: 'Sakura Meadow 6', colorBHex: '#CBEBE3', score: 93.1, type: 'Soft complementary' },
  { id: '45-powder-sky-1-butter-silk-5', rank: 45, colorAName: 'Powder Sky 1', colorAHex: '#DEECF7', colorBName: 'Butter Silk 5', colorBHex: '#D7D398', score: 92.9, type: 'Soft complementary' },
  { id: '46-aqua-veil-5-butter-bloom-1', rank: 46, colorAName: 'Aqua Veil 5', colorAHex: '#98D7D3', colorBName: 'Butter Bloom 1', colorBHex: '#F4E6D7', score: 92.6, type: 'Soft complementary' },
  { id: '47-aqua-whisper-1-flamingo-mint-2', rank: 47, colorAName: 'Aqua Whisper 1', colorAHex: '#DEF7F3', colorBName: 'Flamingo Mint 2', colorBHex: '#EED2C4', score: 92.4, type: 'Soft complementary' },
  { id: '48-peach-cloud-5-marigold-foam-5', rank: 48, colorAName: 'Peach Cloud 5', colorAHex: '#D8978A', colorBName: 'Marigold Foam 5', colorBHex: '#C6ECDA', score: 92.3, type: 'Soft complementary' },
  { id: '49-cotton-candy-dawn-6-soft-riviera-4', rank: 49, colorAName: 'Cotton Candy Dawn 6', colorAHex: '#CC84B0', colorBName: 'Soft Riviera 4', colorBHex: '#CEEBC7', score: 92.2, type: 'Soft complementary' },
  { id: '50-cantaloupe-tide-3-sky-pudding-3', rank: 50, colorAName: 'Cantaloupe Tide 3', colorAHex: '#EBEBBD', colorBName: 'Sky Pudding 3', colorBHex: '#B9D4EA', score: 92.1, type: 'Soft complementary' },
  { id: '51-sky-pudding-6-butter-bloom-3', rank: 51, colorAName: 'Sky Pudding 6', colorAHex: '#80ABCC', colorBName: 'Butter Bloom 3', colorBHex: '#E8E4BF', score: 92.1, type: 'Soft complementary' },
  { id: '52-golden-dew-6-vanilla-rose-3', rank: 52, colorAName: 'Golden Dew 6', colorAHex: '#D0ECE7', colorBName: 'Vanilla Rose 3', colorBHex: '#EAC7B5', score: 92.0, type: 'Soft complementary' },
  { id: '53-blue-petal-3-primrose-whisper-3', rank: 53, colorAName: 'Blue Petal 3', colorAHex: '#B9C8E9', colorBName: 'Primrose Whisper 3', colorBHex: '#E3E9B9', score: 91.7, type: 'Soft complementary' },
  { id: '54-lavender-mist-6-soft-sunrise-3', rank: 54, colorAName: 'Lavender Mist 6', colorAHex: '#8E89CD', colorBName: 'Soft Sunrise 3', colorBHex: '#EDDAC4', score: 91.6, type: 'Soft complementary' },
  { id: '55-vanilla-rose-1-aqua-veil-4', rank: 55, colorAName: 'Vanilla Rose 1', colorAHex: '#F8E9DE', colorBName: 'Aqua Veil 4', colorBHex: '#A8E1DD', score: 91.4, type: 'Soft complementary' },
  { id: '56-lagoon-milk-1-peach-cloud-2', rank: 56, colorAName: 'Lagoon Milk 1', colorAHex: '#DEF7F0', colorBName: 'Peach Cloud 2', colorBHex: '#F1D2C7', score: 91.3, type: 'Soft complementary' },
  { id: '57-berry-foam-6-meadow-cream-3', rank: 57, colorAName: 'Berry Foam 6', colorAHex: '#C777C3', colorBName: 'Meadow Cream 3', colorBHex: '#D0E9B9', score: 91.3, type: 'Soft complementary' },
  { id: '58-honey-milk-6-sunwash-grove-6', rank: 58, colorAName: 'Honey Milk 6', colorAHex: '#CCA474', colorBName: 'Sunwash Grove 6', colorBHex: '#C8EAD8', score: 91.2, type: 'Split-complement pastel' },
  { id: '59-sea-mint-5-sunwash-grove-1', rank: 59, colorAName: 'Sea Mint 5', colorAHex: '#98D7AD', colorBName: 'Sunwash Grove 1', colorBHex: '#F3E2D3', score: 91.1, type: 'Split-complement pastel' },
  { id: '60-shell-bloom-3-coral-meadow-6', rank: 60, colorAName: 'Shell Bloom 3', colorAHex: '#E9C0B9', colorBName: 'Coral Meadow 6', colorBHex: '#CEEDE1', score: 90.9, type: 'Soft complementary' },
]

const PAIR_TYPES = Array.from(new Set(COLOR_PAIRS.map((pair) => pair.type)))
const SORT_OPTIONS: Array<{ label: string; value: SortMode }> = [
  { label: 'Rank', value: 'rank' },
  { label: 'Score', value: 'score' },
  { label: 'Type', value: 'type' },
]

function copyTextFallback(value: string) {
  const textArea = document.createElement('textarea')
  textArea.value = value
  textArea.style.position = 'fixed'
  textArea.style.opacity = '0'
  document.body.append(textArea)
  textArea.select()
  document.execCommand('copy')
  textArea.remove()

  return Promise.resolve()
}

async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value)
      return
    } catch {
      return copyTextFallback(value)
    }
  }

  return copyTextFallback(value)
}

function formatScore(score: number) {
  return Number.isInteger(score) ? score.toString() : score.toFixed(1)
}

function hexToRgb(hex: string) {
  const clean = hex.replace('#', '')
  const r = Number.parseInt(clean.slice(0, 2), 16)
  const g = Number.parseInt(clean.slice(2, 4), 16)
  const b = Number.parseInt(clean.slice(4, 6), 16)

  return `${r} ${g} ${b}`
}

function getReadableText(hex: string) {
  const clean = hex.replace('#', '')
  const r = Number.parseInt(clean.slice(0, 2), 16) / 255
  const g = Number.parseInt(clean.slice(2, 4), 16) / 255
  const b = Number.parseInt(clean.slice(4, 6), 16) / 255
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b

  return luminance > 0.58 ? '#141512' : '#fffdf7'
}

function pairSearchText(pair: ColorPair) {
  return [
    pair.rank,
    `#${pair.rank}`,
    pair.colorAName,
    pair.colorAHex,
    pair.colorBName,
    pair.colorBHex,
    pair.score,
    pair.type,
  ]
    .join(' ')
    .toLowerCase()
}

function pairStyle(pair: ColorPair) {
  return {
    '--color-a': pair.colorAHex,
    '--color-b': pair.colorBHex,
    '--text-on-a': getReadableText(pair.colorAHex),
    '--text-on-b': getReadableText(pair.colorBHex),
  } as CSSProperties
}

function App() {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [sortMode, setSortMode] = useState<SortMode>('rank')
  const [selectedPairId, setSelectedPairId] = useState(COLOR_PAIRS[0].id)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const copyResetTimer = useRef<number | null>(null)

  const selectedPair =
    COLOR_PAIRS.find((pair) => pair.id === selectedPairId) ?? COLOR_PAIRS[0]
  const selectedPairText = `${selectedPair.colorAName} ${selectedPair.colorAHex} / ${selectedPair.colorBName} ${selectedPair.colorBHex}`
  const normalizedSearch = search.trim().toLowerCase()

  const visiblePairs = useMemo(() => {
    const filteredPairs = COLOR_PAIRS.filter((pair) => {
      const matchesType = typeFilter === 'all' || pair.type === typeFilter
      const matchesSearch =
        normalizedSearch.length === 0 ||
        pairSearchText(pair).includes(normalizedSearch)

      return matchesType && matchesSearch
    })

    return [...filteredPairs].sort((first, second) => {
      if (sortMode === 'score') {
        return second.score - first.score || first.rank - second.rank
      }

      if (sortMode === 'type') {
        return first.type.localeCompare(second.type) || first.rank - second.rank
      }

      return first.rank - second.rank
    })
  }, [normalizedSearch, sortMode, typeFilter])

  const filterSummary = useMemo(() => {
    const details = [`${visiblePairs.length} of ${COLOR_PAIRS.length} pairs`]

    if (typeFilter !== 'all') {
      details.push(typeFilter)
    }

    if (normalizedSearch) {
      details.push(`matching "${search.trim()}"`)
    }

    return details.join(' | ')
  }, [normalizedSearch, search, typeFilter, visiblePairs.length])

  async function handleCopy(key: string, value: string) {
    await copyText(value)
    setCopiedKey(key)

    if (copyResetTimer.current) {
      window.clearTimeout(copyResetTimer.current)
    }

    copyResetTimer.current = window.setTimeout(() => setCopiedKey(null), 1200)
  }

  function resetFilters() {
    setSearch('')
    setTypeFilter('all')
    setSortMode('rank')
  }

  return (
    <main className="studio">
      <header className="studio-header">
        <div className="brand-lockup">
          <span className="brand-mark" aria-hidden="true">
            <Palette size={22} strokeWidth={2.4} />
          </span>
          <div>
            <p className="eyebrow">Color Duet Studio</p>
            <h1>Pairing Gallery</h1>
          </div>
        </div>

        <div className="header-stats" aria-label="Gallery summary">
          <span>{COLOR_PAIRS.length} pairs</span>
          <span>{PAIR_TYPES.length} types</span>
          <span>{filterSummary}</span>
        </div>
      </header>

      <div className="studio-layout">
        <section className="gallery-panel" aria-label="Color pair gallery">
          <div className="control-bar">
            <label className="search-field">
              <span>Search</span>
              <span className="search-input">
                <Search size={17} strokeWidth={2.3} aria-hidden="true" />
                <input
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Name, HEX, type, or #rank"
                  type="search"
                  value={search}
                />
              </span>
            </label>

            <label className="select-field">
              <span>Type</span>
              <select
                onChange={(event) => setTypeFilter(event.target.value)}
                value={typeFilter}
              >
                <option value="all">All types</option>
                {PAIR_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>

            <label className="select-field">
              <span>Sort</span>
              <select
                onChange={(event) => setSortMode(event.target.value as SortMode)}
                value={sortMode}
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <button className="reset-button" onClick={resetFilters} type="button">
              <RotateCcw size={16} strokeWidth={2.4} aria-hidden="true" />
              <span>Reset</span>
            </button>
          </div>

          {visiblePairs.length > 0 ? (
            <div className="pair-grid">
              {visiblePairs.map((pair) => (
                <PairCard
                  key={pair.id}
                  onSelect={() => setSelectedPairId(pair.id)}
                  pair={pair}
                  selected={selectedPair.id === pair.id}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No matching pairs.</p>
              <button className="reset-button" onClick={resetFilters} type="button">
                <RotateCcw size={16} strokeWidth={2.4} aria-hidden="true" />
                <span>Reset filters</span>
              </button>
            </div>
          )}
        </section>

        <aside
          className="detail-panel"
          style={pairStyle(selectedPair)}
          aria-label="Selected color pair"
        >
          <div className="detail-header">
            <div>
              <p className="eyebrow">Selected pair</p>
              <h2>#{selectedPair.rank}</h2>
            </div>
            <div className="score-pill">{formatScore(selectedPair.score)}</div>
          </div>

          <div
            className="detail-swatch"
            role="img"
            aria-label={selectedPairText}
          >
            <section className="detail-color detail-color--a">
              <span>{selectedPair.colorAName}</span>
              <strong>{selectedPair.colorAHex}</strong>
            </section>
            <section className="detail-color detail-color--b">
              <span>{selectedPair.colorBName}</span>
              <strong>{selectedPair.colorBHex}</strong>
            </section>
          </div>

          <div className="type-band">
            <span>Type</span>
            <strong>{selectedPair.type}</strong>
          </div>

          <div className="detail-actions">
            <ColorRow
              copiedKey={copiedKey}
              colorKey="a"
              hex={selectedPair.colorAHex}
              name={selectedPair.colorAName}
              onCopy={handleCopy}
            />
            <ColorRow
              copiedKey={copiedKey}
              colorKey="b"
              hex={selectedPair.colorBHex}
              name={selectedPair.colorBName}
              onCopy={handleCopy}
            />
          </div>

          <button
            className="copy-pair-button"
            onClick={() => handleCopy('pair', selectedPairText)}
            type="button"
          >
            <CopyButtonIcon active={copiedKey === 'pair'} />
            <span>Copy pair</span>
          </button>

          <p className="copy-status" aria-live="polite">
            {copiedKey ? 'Copied' : 'Select a card to inspect and copy values'}
          </p>
        </aside>
      </div>
    </main>
  )
}

type PairCardProps = {
  onSelect: () => void
  pair: ColorPair
  selected: boolean
}

function PairCard({ onSelect, pair, selected }: PairCardProps) {
  return (
    <button
      aria-pressed={selected}
      className="pair-card"
      data-selected={selected}
      onClick={onSelect}
      style={pairStyle(pair)}
      type="button"
    >
      <span className="pair-card__topline">
        <strong>#{pair.rank}</strong>
        <span>{selected ? 'Selected' : formatScore(pair.score)}</span>
      </span>

      <span className="pair-card__swatch" aria-hidden="true">
        <span />
        <span />
      </span>

      <span className="pair-card__names">
        <span>{pair.colorAName}</span>
        <span>{pair.colorBName}</span>
      </span>

      <span className="pair-card__meta">
        <span>{pair.colorAHex}</span>
        <span>{pair.colorBHex}</span>
      </span>

      <span className="type-chip">{pair.type}</span>
    </button>
  )
}

type ColorRowProps = {
  colorKey: 'a' | 'b'
  copiedKey: string | null
  hex: string
  name: string
  onCopy: (key: string, value: string) => void
}

function ColorRow({ colorKey, copiedKey, hex, name, onCopy }: ColorRowProps) {
  const rgb = hexToRgb(hex)

  return (
    <section className="color-row">
      <span className="color-row__dot" style={{ background: hex }} aria-hidden="true" />
      <div>
        <h3>{name}</h3>
        <p>
          {hex} / RGB {rgb}
        </p>
      </div>
      <div className="copy-cluster">
        <CopyButton
          active={copiedKey === `${colorKey}-hex`}
          label={`Copy ${name} HEX`}
          onClick={() => onCopy(`${colorKey}-hex`, hex)}
        />
        <CopyButton
          active={copiedKey === `${colorKey}-rgb`}
          label={`Copy ${name} RGB`}
          onClick={() => onCopy(`${colorKey}-rgb`, rgb)}
        />
      </div>
    </section>
  )
}

type CopyButtonProps = {
  active: boolean
  label: string
  onClick: () => void
}

function CopyButton({ active, label, onClick }: CopyButtonProps) {
  return (
    <button
      aria-label={label}
      className="copy-button"
      onClick={onClick}
      title={label}
      type="button"
    >
      <CopyButtonIcon active={active} />
    </button>
  )
}

function CopyButtonIcon({ active }: { active: boolean }) {
  return (
    <>
      <Copy className="copy-icon copy-icon--idle" size={15} strokeWidth={2.5} />
      <Check
        className="copy-icon copy-icon--done"
        data-active={active}
        size={15}
        strokeWidth={2.8}
      />
    </>
  )
}

export default App
