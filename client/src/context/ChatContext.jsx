import React, { createContext, useState, useEffect, useCallback, useContext } from 'react'
import { baseUrl, getRequest, postRequest } from '../utils/services'
import { AuthContext } from './AuthContext'

export const ChatContext = createContext()

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState([])
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false)
  const [userChatsError, setUserChatsError] = useState(null)
  const [potentialChats, setPotentialChats] = useState([])
  const [potentialChatsError, setPotentialChatsError] = useState(null)
  const [isPotentialChatsLoading, setIsPotentialChatsLoading] = useState(false)

  const postRequestCallback = useCallback((endpoint, body) => {
    return postRequest(endpoint, body)
  }, []);

  // Fonction pour créer un nouveau chat
  const createChat = useCallback(async (firstId, secondId) => {
    try {
      const response = await postRequest(`${baseUrl}/chats`, { first_user: firstId, second_user: secondId });
      if (response.error) {
        console.error("Error creating chat:", response.error);
      } else {
        // Mettre à jour les chats de l'utilisateur après la création du chat
        const updatedUserChats = [...userChats, response.chat];
        setUserChats(updatedUserChats);
      }
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  }, [userChats]);


  useEffect(() => {
    const getUsers = async () => {
      setIsPotentialChatsLoading(true)
      try {
        const response = await getRequest(`${baseUrl}/users`)
        if (response.error) {
          setPotentialChatsError(response.error)
        } else {
          setPotentialChats(response.users)
        }
      } catch (error) {
        setPotentialChatsError(error)
      }
      setIsPotentialChatsLoading(false)
    }

    getUsers()
  }, [])

  useEffect(() => {
    if (user) {
      const getUserChats = async () => {
        setIsUserChatsLoading(true)
        try {
          const response = await getRequest(`${baseUrl}/chats/${user._id}`)
          if (response.error) {
            setUserChatsError(response.error)
          } else {
            setUserChats(response.chats)
          }
        } catch (error) {
          setUserChatsError(error)
        }
        setIsUserChatsLoading(false)
      }

      getUserChats()
    }
  }, [user])
  

  if (potentialChatsError) {
    return <p>Error: {potentialChatsError.message}</p>
  }

  if (isPotentialChatsLoading) {
    return <p>Loading potential chats...</p>
  }

  if (isUserChatsLoading) {
    return <p>Loading user chats...</p>
  }

  if (userChatsError) {
    return <p>Error: {userChatsError.message}</p>
  }


  return (
    <ChatContext.Provider value={{ userChats, potentialChats, postRequestCallback, createChat }}>
      {children}
    </ChatContext.Provider>
  )
}