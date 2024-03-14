import { useState, useEffect } from "react"
import { baseUrl, getRequest } from "../utils/services"

export const useFetchRecipientUser = (chat, user) => {
  const [recipientUser, setRecipientUser] = useState(null)
  const [error, setError] = useState(null)

  // Add null checks for chat and chat.member
  if (!chat || !chat.member) {
    return { recipientUser, error: "chat or chat.member is undefined" }
  }

  const recipientId = chat.member.find((id) => id !== user._id)

  useEffect(() => {
    const getUser = async () => {
      // Add null check for recipientId
      if (!recipientId) {
        return setError("recipientId is undefined")
      }

      const response = await getRequest(`${baseUrl}/users/find/${recipientId}`)

      // Use response.ok instead of response.error
      if (!response.ok) {
        return setError({ message: response.statusText, status: response.status })
      }

      setRecipientUser(response)
    }

    getUser()
  }, [chat, user, recipientId]) // Add recipientId to dependencies list

  return { recipientUser, error }
}