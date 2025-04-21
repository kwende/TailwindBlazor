import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, Info, FileText, Mail, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  const settingsCards = [
    {
      title: "Company Profile",
      description: "Manage your company profile, logo, and branding settings",
      icon: <Building className="h-8 w-8 text-perfecthire-700" />,
      href: "/settings/company-profile",
    },
    {
      title: "Company Info",
      description: "Update company details, locations, and departments",
      icon: <Info className="h-8 w-8 text-perfecthire-700" />,
      href: "/settings/company-info",
    },
    {
      title: "Offer Settings",
      description: "Configure offer templates, approval workflows, and defaults",
      icon: <FileText className="h-8 w-8 text-perfecthire-700" />,
      href: "/settings/offer-settings",
    },
    {
      title: "Email Templates",
      description: "Customize email templates for candidate communications",
      icon: <Mail className="h-8 w-8 text-perfecthire-700" />,
      href: "/settings/email-templates",
    },
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-perfecthire-900">Settings</h1>
        <p className="text-perfecthire-600 mt-2">Configure your Perfect Hire platform settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settingsCards.map((card, index) => (
          <Card key={index} className="transition-all hover:shadow-md">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-perfecthire-100">{card.icon}</div>
                <div>
                  <CardTitle className="text-perfecthire-900">{card.title}</CardTitle>
                  <CardDescription className="text-perfecthire-600">{card.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardFooter className="flex justify-end">
              <Link href={card.href}>
                <Button className="bg-perfecthire-900 hover:bg-perfecthire-800 text-white">
                  Configure
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

