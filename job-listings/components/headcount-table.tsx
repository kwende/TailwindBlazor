"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Pencil, Trash2, Check, X } from "lucide-react"

export default function HeadcountTable() {
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editedValues, setEditedValues] = useState({
    department: "",
    title: "",
    q1: 0,
    q2: 0,
    q3: 0,
    q4: 0,
    status: "",
  })

  // Mock data for headcount planning
  const [headcountPlans, setHeadcountPlans] = useState([
    {
      id: 1,
      department: "Engineering",
      title: "Software Engineer",
      q1: 2,
      q2: 3,
      q3: 2,
      q4: 1,
      status: "approved",
    },
    {
      id: 2,
      department: "Engineering",
      title: "Product Designer",
      q1: 1,
      q2: 1,
      q3: 1,
      q4: 0,
      status: "approved",
    },
    {
      id: 3,
      department: "Marketing",
      title: "Marketing Manager",
      q1: 0,
      q2: 1,
      q3: 1,
      q4: 0,
      status: "pending",
    },
    {
      id: 4,
      department: "Sales",
      title: "Account Executive",
      q1: 2,
      q2: 2,
      q3: 3,
      q4: 2,
      status: "approved",
    },
    {
      id: 5,
      department: "Product",
      title: "Product Manager",
      q1: 1,
      q2: 0,
      q3: 1,
      q4: 0,
      status: "approved",
    },
  ])

  const startEditing = (plan) => {
    setEditingId(plan.id)
    setEditedValues({
      department: plan.department,
      title: plan.title,
      q1: plan.q1,
      q2: plan.q2,
      q3: plan.q3,
      q4: plan.q4,
      status: plan.status,
    })
  }

  const saveEditing = (id) => {
    setHeadcountPlans(
      headcountPlans.map((plan) =>
        plan.id === id
          ? {
              ...plan,
              department: editedValues.department,
              title: editedValues.title,
              q1: editedValues.q1,
              q2: editedValues.q2,
              q3: editedValues.q3,
              q4: editedValues.q4,
              status: editedValues.status,
            }
          : plan,
      ),
    )
    setEditingId(null)
  }

  const cancelEditing = () => {
    setEditingId(null)
  }

  const handleInputChange = (field, value) => {
    setEditedValues({
      ...editedValues,
      [field]:
        field === "title" || field === "department" || field === "status" ? value : Number.parseInt(value, 10) || 0,
    })
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case "pending":
        return <Badge className="bg-amber-100 text-amber-800">Pending</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getTotalHeadcount = (plan) => {
    return plan.q1 + plan.q2 + plan.q3 + plan.q4
  }

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Department</TableHead>
              <TableHead>Position Title</TableHead>
              <TableHead className="text-center">Q1</TableHead>
              <TableHead className="text-center">Q2</TableHead>
              <TableHead className="text-center">Q3</TableHead>
              <TableHead className="text-center">Q4</TableHead>
              <TableHead className="text-center">Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {headcountPlans.map((plan) => (
              <TableRow key={plan.id}>
                {editingId === plan.id ? (
                  // Editing mode
                  <>
                    <TableCell>
                      <Select
                        value={editedValues.department}
                        onValueChange={(value) => handleInputChange("department", value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Engineering">Engineering</SelectItem>
                          <SelectItem value="Product">Product</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Sales">Sales</SelectItem>
                          <SelectItem value="HR">HR</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        value={editedValues.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        className="w-full"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        value={editedValues.q1}
                        onChange={(e) => handleInputChange("q1", e.target.value)}
                        className="w-16 mx-auto text-center"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        value={editedValues.q2}
                        onChange={(e) => handleInputChange("q2", e.target.value)}
                        className="w-16 mx-auto text-center"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        value={editedValues.q3}
                        onChange={(e) => handleInputChange("q3", e.target.value)}
                        className="w-16 mx-auto text-center"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        value={editedValues.q4}
                        onChange={(e) => handleInputChange("q4", e.target.value)}
                        className="w-16 mx-auto text-center"
                      />
                    </TableCell>
                    <TableCell className="text-center font-medium">
                      {editedValues.q1 + editedValues.q2 + editedValues.q3 + editedValues.q4}
                    </TableCell>
                    <TableCell>
                      <Select value={editedValues.status} onValueChange={(value) => handleInputChange("status", value)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => saveEditing(plan.id)}>
                          <Check className="h-4 w-4 text-green-600" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={cancelEditing}>
                          <X className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </>
                ) : (
                  // View mode
                  <>
                    <TableCell className="font-medium text-perfecthire-900">{plan.department}</TableCell>
                    <TableCell>{plan.title}</TableCell>
                    <TableCell className="text-center">{plan.q1}</TableCell>
                    <TableCell className="text-center">{plan.q2}</TableCell>
                    <TableCell className="text-center">{plan.q3}</TableCell>
                    <TableCell className="text-center">{plan.q4}</TableCell>
                    <TableCell className="text-center font-medium">{getTotalHeadcount(plan)}</TableCell>
                    <TableCell>{getStatusBadge(plan.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => startEditing(plan)}>
                          <Pencil className="h-4 w-4 text-perfecthire-700" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setHeadcountPlans(headcountPlans.filter((p) => p.id !== plan.id))}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex justify-end">
        <Button
          className="bg-perfecthire-900 hover:bg-perfecthire-800 text-white"
          onClick={() => {
            const newId = Math.max(...headcountPlans.map((p) => p.id)) + 1
            setHeadcountPlans([
              ...headcountPlans,
              {
                id: newId,
                department: "Engineering",
                title: "New Position",
                q1: 0,
                q2: 0,
                q3: 0,
                q4: 0,
                status: "pending",
              },
            ])
            setEditingId(newId)
            setEditedValues({
              department: "Engineering",
              title: "New Position",
              q1: 0,
              q2: 0,
              q3: 0,
              q4: 0,
              status: "pending",
            })
          }}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Row
        </Button>
      </div>
    </div>
  )
}

