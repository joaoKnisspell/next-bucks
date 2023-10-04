'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth'
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore'
import { auth, db } from '@/libs/firebase'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'

export interface TransactionProps {
  id: string
  title: string
  type: string
  value: number
  category: string
  date: string
  createdAt: string
  userUid: string
}

interface UserProps {
  uid: string
  name: string
  email: string
  imgPath: string
}

interface TransactionDocProps {
  title: string
  type: string
  category: string
  value: number
}

interface GoalDocProps {
  id: string
  title: string
  targetAmount: number
  targetAchieved: number
  finalDate: Date
  porcentageAchieved: number
}

interface GoalFormProps {
  title: string
  targetAmount: number
  targetAchieved: number
  finalDate: Date
}

interface UserContextProps {
  user: null | UserProps
  transactionsTotal: number
  incPorcentage: number
  outPorcentage: number
  // eslint-disable-next-line
  transactions: any | TransactionProps[]
  // eslint-disable-next-line
  incomes: any | TransactionProps[]
  // eslint-disable-next-line
  expenses: any | TransactionProps[]
  // eslint-disable-next-line
  goals: any | GoalDocProps[]
  googleSignIn: () => void
  logOut: () => void
  newTransaction: ({
    title,
    type,
    value,
    category,
  }: TransactionDocProps) => void
  deleteTransaction: (id: string) => void
  getTransactions: () => void
  newGoal: ({
    title,
    targetAmount,
    targetAchieved,
    finalDate,
  }: GoalFormProps) => void
  updateGoalById: (
    id: string,
    { title, finalDate, targetAchieved, targetAmount }: GoalFormProps,
  ) => void
  deleteGoal: (id: string) => void
}

const UserContext = createContext({} as UserContextProps)

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<UserProps | null>(null)
  const router = useRouter()
  // eslint-disable-next-line
  const [transactions, setTransactions] = useState<TransactionProps | any>([])
  // eslint-disable-next-line
  const [incomes, setIncomes] = useState<TransactionProps | any>([])
  // eslint-disable-next-line
  const [expenses, setExpenses] = useState<TransactionProps | any>([])
  const [transactionsTotal, setTransactionsTotal] = useState(0)
  const [incPorcentage, setIncPorcentage] = useState(0)
  const [outPorcentage, setOutPorcentage] = useState(0)
  const [goals, setGoals] = useState<GoalDocProps | []>([])

  async function newTransaction({
    title,
    type,
    value,
    category,
  }: TransactionDocProps) {
    try {
      const docRef = collection(db, 'transactions')
      await addDoc(docRef, {
        title,
        type,
        value,
        userUid: user?.uid,
        category,
        date: format(new Date(), 'MMM d, yyyy'),
        createdAt: new Date(),
      })
      getTransactions()
      router.push('/transactions')
    } catch (error) {
      console.log(error)
    }
  }

  async function deleteTransaction(id: string) {
    try {
      const docRef = doc(db, 'transactions', id)
      await deleteDoc(docRef).then(() => {
        getTransactions()
      })
    } catch (error) {
      console.log(error)
    }
  }

  async function getTransactions() {
    const docsRef = collection(db, 'transactions')
    const q = query(
      docsRef,
      orderBy('createdAt', 'desc'),
      where('userUid', '==', user?.uid),
    )

    // eslint-disable-next-line
    const dataResponse = await getDocs(q).then((docs) => {
      const list: TransactionProps[] = []
      docs.forEach((doc) => {
        list.push({
          id: doc.id,
          title: doc.data().title,
          userUid: doc.data().userUid,
          createdAt: doc.data().createdAt,
          type: doc.data().type,
          category: doc.data().category,
          value: doc.data().value,
          date: doc.data().date,
        })
      })
      setTransactions(list)
      getTransactionsResume(list)
    })
  }

  async function newGoal({
    title,
    targetAmount,
    targetAchieved,
    finalDate,
  }: GoalFormProps) {
    const docsRef = collection(db, 'goals')
    try {
      await addDoc(docsRef, {
        title,
        targetAmount,
        targetAchieved,
        finalDate,
        userUid: user?.uid,
        createdAt: new Date(),
      }).then(() => {
        getGoals()
        router.push('/goals')
      })
    } catch (error) {
      console.log(error)
    }
  }

  async function deleteGoal(id: string) {
    const docRef = doc(db, 'goals', id)
    try {
      await deleteDoc(docRef).then(() => {
        getGoals()
        router.push('/goals')
      })
    } catch (error) {
      console.log(error)
    }
  }

  async function getGoals() {
    const docsRef = collection(db, 'goals')
    const q = query(
      docsRef,
      orderBy('createdAt', 'desc'),
      where('userUid', '==', user?.uid),
    )
    await getDocs(q).then((dataResponse) => {
      // eslint-disable-next-line
      const list: any = []
      dataResponse.forEach((doc) => {
        list.push({
          id: doc.id,
          title: doc.data().title,
          targetAmount: Number(doc.data().targetAmount),
          targetAchieved: Number(doc.data().targetAchieved),
          finalDate: format(new Date(doc.data().finalDate), 'MMM d, yyyy'),
          porcentageAchieved:
            (doc.data().targetAchieved * 100) / doc.data().targetAmount,
        })
      })
      setGoals(list)
    })
  }

  async function updateGoalById(
    id: string,
    { finalDate, targetAmount, title, targetAchieved }: GoalFormProps,
  ) {
    const docRef = doc(db, 'goals', id)
    try {
      await updateDoc(docRef, {
        title,
        finalDate,
        targetAchieved,
        targetAmount,
      }).then(() => {
        getGoals()
        router.push('/goals')
      })
    } catch (error) {
      console.log(error)
    }
  }

  async function googleSignIn() {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider).then(() => {
      router.push('/')
    })
  }

  async function logOut() {
    await signOut(auth).then(() => {
      router.push('/signIn')
      setUser(null)
    })
  }

  function getTransactionsResume(list: TransactionProps[]) {
    const incTransactions = list.filter((ele) => ele.type === 'income')
    setIncomes(incTransactions)
    const outTransactions = list.filter((ele) => ele.type === 'expense')
    setExpenses(outTransactions)

    const incValues = incTransactions.map((ele) => ele.value)
    const outValues = outTransactions.map((ele) => ele.value)

    if (incValues.length > 1 && outValues.length <= 1) {
      const incTotal = incValues.reduce(
        (total, currentValue) => total + currentValue,
      )
      let outTotal: number
      if (outValues.length === 0) {
        outTotal = 0
        setTransactionsTotal(incTotal + outTotal)
        setIncPorcentage(100)
        setOutPorcentage(0)
      } else {
        outTotal = outValues[0]
        setTransactionsTotal(incTotal - outTotal)
        const incAmount = (incTotal * 100) / (incTotal + outTotal)
        const outAmount = (outTotal * 100) / (incTotal + outTotal)
        setIncPorcentage(Math.round(incAmount))
        setOutPorcentage(Math.round(outAmount))
      }
    } else if (outValues.length > 1 && incValues.length <= 1) {
      const outTotal = outValues.reduce(
        (total, currentValue) => total + currentValue,
      )
      let incTotal: number
      if (incValues.length === 0) {
        incTotal = 0
        setTransactionsTotal(-outTotal)
        setIncPorcentage(0)
        setOutPorcentage(100)
      } else {
        incTotal = incValues[0]
        setTransactionsTotal(-outTotal + incTotal)
        const incAmount = (incTotal * 100) / (incTotal + outTotal)
        const outAmount = (outTotal * 100) / (incTotal + outTotal)
        setIncPorcentage(Math.round(incAmount))
        setOutPorcentage(Math.round(outAmount))
      }
    } else if (outValues.length > 1 && incValues.length === 0) {
      const outTotal = outValues.reduce(
        (total, currentValue) => total + currentValue,
      )
      const incTotal = 0
      setTransactionsTotal(outTotal + incTotal)
      setIncPorcentage(0)
      setOutPorcentage(100)
    } else if (incValues.length > 1 && outValues.length > 1) {
      const incTotal = incValues.reduce(
        (total, currentValue) => total + currentValue,
      )
      const outTotal = outValues.reduce(
        (total, currentValue) => total + currentValue,
      )
      const totalAmount = incTotal - outTotal

      setTransactionsTotal(totalAmount)

      const porcentageTotalAmount = incTotal + outTotal

      const incAmount = (incTotal * 100) / porcentageTotalAmount
      const outAmount = (outTotal * 100) / porcentageTotalAmount

      setIncPorcentage(Math.round(incAmount))
      setOutPorcentage(Math.round(outAmount))
    } else if (incValues.length === 0 && outValues.length === 0) {
      setTransactionsTotal(0)
      setIncPorcentage(0)
      setOutPorcentage(0)
    } else {
      const incTotal = incValues[0]
      const outTotal = outValues[0]
      if (typeof incTotal !== 'number') {
        const totalAmount = 0 - outTotal
        setTransactionsTotal(totalAmount)
        setIncPorcentage(0)
        setOutPorcentage(100)
      } else if (typeof outTotal !== 'number') {
        const totalAmount = incTotal - 0
        setTransactionsTotal(totalAmount)
        setIncPorcentage(100)
        setOutPorcentage(0)
      } else {
        const totalAmount = incTotal - outTotal
        setTransactionsTotal(totalAmount)
        const porcentageTotalAmount = incTotal + outTotal
        const incAmount = (incTotal * 100) / porcentageTotalAmount
        const outAmount = (outTotal * 100) / porcentageTotalAmount
        setIncPorcentage(Math.round(incAmount))
        setOutPorcentage(Math.round(outAmount))
      }
    }
  }

  useEffect(() => {
    async function checklogin() {
      // eslint-disable-next-line
      await onAuthStateChanged(auth, (user: any) => {
        if (user) {
          // console.log(user.uid)
          setUser({
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            imgPath: user.photoURL,
          })
        } else {
          setUser(null)
          router.push('signIn')
        }
      })
    }

    checklogin()
  }, [router])

  useEffect(() => {
    if (user) {
      getTransactions()
      getGoals()
    }
    // eslint-disable-next-line
  }, [user])

  return (
    <UserContext.Provider
      value={{
        user,
        googleSignIn,
        logOut,
        newTransaction,
        deleteTransaction,
        getTransactions,
        transactions,
        incomes,
        expenses,
        incPorcentage,
        outPorcentage,
        transactionsTotal,
        newGoal,
        goals,
        updateGoalById,
        deleteGoal,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(UserContext)
}
