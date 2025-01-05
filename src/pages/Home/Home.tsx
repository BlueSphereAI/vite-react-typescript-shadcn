'use client'

import { useNavigate } from 'react-router-dom'
import { Button } from "../../components/ui/button"
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
          >
            Go to Dashboard
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
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
              className="px-8"
              onClick={() => navigate('/dashboard')}
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="px-8"
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
            <h3 className={styles.featureTitle}>Immutable Records</h3>
            <p className={styles.featureDescription}>
              Secure, tamper-proof storage of all contract-related activities on the blockchain.
            </p>
          </div>
          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>Transparent Process</h3>
            <p className={styles.featureDescription}>
              Complete visibility into contract negotiations, amendments, and approval workflows.
            </p>
          </div>
          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>Audit Trail</h3>
            <p className={styles.featureDescription}>
              Comprehensive tracking of all actions and changes throughout the contract lifecycle.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
} 