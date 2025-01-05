'use client'

import { useNavigate } from 'react-router-dom'
import { Button } from "../../components/ui/button"
import { Shield, FileText, History } from 'lucide-react'
import styles from './Home.module.css'

export function Home() {
  const navigate = useNavigate()

  return (
    <div>
      {/* Header Section */}
      <header className="w-full py-6 px-4 sm:px-6 lg:px-8 fixed top-0 bg-white/80 backdrop-blur-sm z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="https://clearcontract.greensphere.one/images/logo.jpg"
              alt="ClearContract Logo"
              className="h-12 w-auto"
            />
            <h1 className="ml-4 text-2xl font-bold text-gray-900">ClearContract</h1>
          </div>
          <Button 
            variant="outline"
            onClick={() => navigate('/dashboard')}
            className="rounded-full"
          >
            Go to Dashboard
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 opacity-90" />
          <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-blue-500/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        </div>
        <div className={styles.heroContent}>
          <h2 className={styles.heroTitle}>
            Enhancing Government Procurement Transparency
          </h2>
          <p className={styles.heroDescription}>
            Leveraging blockchain technology to ensure transparent and immutable records of contract processes. 
            We provide a secure platform for contract negotiations, amendments, and approvals with a complete audit trail.
          </p>
          <div className={styles.heroActions}>
            <Button 
              variant="default" 
              size="lg"
              className="rounded-full px-8"
              onClick={() => navigate('/dashboard')}
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="rounded-full px-8"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className="mb-6 p-3 rounded-full bg-blue-50 w-fit">
              <Shield className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className={styles.featureTitle}>Immutable Records</h3>
            <p className={styles.featureDescription}>
              Secure, tamper-proof storage of all contract-related activities on the blockchain.
              Every change is permanently recorded and verifiable.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className="mb-6 p-3 rounded-full bg-blue-50 w-fit">
              <FileText className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className={styles.featureTitle}>Transparent Process</h3>
            <p className={styles.featureDescription}>
              Complete visibility into contract negotiations, amendments, and approval workflows.
              Track every step of the procurement process.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className="mb-6 p-3 rounded-full bg-blue-50 w-fit">
              <History className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className={styles.featureTitle}>Audit Trail</h3>
            <p className={styles.featureDescription}>
              Comprehensive tracking of all actions and changes throughout the contract lifecycle.
              Never lose track of important decisions and modifications.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
} 