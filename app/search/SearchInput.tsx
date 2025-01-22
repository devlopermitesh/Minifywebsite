"use client"
import { Input } from '@/components/Input'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import { useDebounceValue } from 'usehooks-ts'
import  qs from 'query-string';
import SongContent from './SongContent'
const SearchInput = () => {
    const [isSearching, setIsSearching] = useState(false)
    const [search, setSearch] = useState('')
    const [searchMessage, setSearchMessage] = useState('')
    const supabaseClient = useSupabaseClient()
    const [searchData, setSearchData] = useState([])
    const router = useRouter()
    // Debouncing search value itself
    const [debouncedSearchValue, setDebouncedSearchValue] = useDebounceValue(search, 500)
// Search function optimized with async handling without url push
    // Search function optimized with async handling
    const handleSearch = useCallback(async (title: string) => {
        setIsSearching(true)
        setSearchMessage('')
        try {
            const { data, error } = await supabaseClient
                .from('songs')
                .select('*')
                .ilike('title', `%${title}%`)
                .order('created_at', { ascending: false })

            if (error) {
                toast.error('Error occurred while searching')
            }

            if (data) {
                if (data.length === 0) {
                    setSearchMessage('No results found')
                    setSearchData([])
                } else {
                    setSearchData(data as any)
                }
            }
        } catch (error) {
            toast.error('Error occurred while searching')
        } finally {
            setIsSearching(false)
        }
    }, [supabaseClient])
    // Effect to trigger search after debounce
    useEffect(() => {
        if (debouncedSearchValue) {
            handleSearch(debouncedSearchValue)
        }
    }, [debouncedSearchValue, handleSearch])

useEffect(()=>{
try {
    const query={
        title:debouncedSearchValue
    }
const url=qs.stringifyUrl({url:'/search',query})
router.push(url)
} catch (error) {
    console.log(error)
}
},[debouncedSearchValue,router])

    
    return (
        <div>
            <Input
                type='text'
                placeholder='Search What do you want to listen'
                value={search}
                className='w-[90%] mx-auto md:w-[98%]'
                onChange={(e) => setSearch(e.target.value)} 
            />
            {isSearching && <p>Searching...</p>}
<SongContent Songs={searchData} className='mt-4'></SongContent>

        </div>
    )
}

export default SearchInput
