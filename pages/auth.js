import React from 'react'
import { AuthRedirect } from '../hooks/authUser'
import { supabase } from '../utils/initSupabase'
import { Auth, Card, Typography, Space } from '@supabase/ui'
import {navigation} from '../components/header/navigation.js'

import Head from '../components/head'
import Header from '../components/header'

const AuthPage = () => {
  AuthRedirect()
  
  return (
    <>
      <Head />
      <Header />
      <div className="authcontainer">
        <Card>
          <Space direction="vertical" size={8}>
            <div>
              <Typography.Title level={3}>Welcome</Typography.Title>
            </div>
            <Auth
              supabaseClient={supabase}
              view={'sign_up'}
              socialLayout="horizontal"
              socialButtonSize="xlarge"
            />
          </Space>
        </Card>
      </div>
    </>
  )
}

export default AuthPage