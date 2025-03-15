"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { RefreshCw } from "lucide-react"

export default function SearchFilters() {
  const [distance, setDistance] = useState([50])

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">Location</h3>
        <Input placeholder="City, State, or Zip Code" />
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Distance</Label>
            <span className="text-sm text-muted-foreground">{distance[0]} miles</span>
          </div>
          <Slider value={distance} onValueChange={setDistance} max={500} step={10} />
        </div>
      </div>

      <Accordion type="multiple" defaultValue={["status", "phase"]}>
        <AccordionItem value="status">
          <AccordionTrigger>Trial Status</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="recruiting" defaultChecked />
                <Label htmlFor="recruiting">Recruiting</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="not-recruiting" />
                <Label htmlFor="not-recruiting">Not yet recruiting</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="active" />
                <Label htmlFor="active">Active, not recruiting</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="completed" />
                <Label htmlFor="completed">Completed</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="phase">
          <AccordionTrigger>Trial Phase</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="phase1" />
                <Label htmlFor="phase1">Phase 1</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="phase2" defaultChecked />
                <Label htmlFor="phase2">Phase 2</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="phase3" defaultChecked />
                <Label htmlFor="phase3">Phase 3</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="phase4" />
                <Label htmlFor="phase4">Phase 4</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="early-phase" />
                <Label htmlFor="early-phase">Early Phase 1</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="condition">
          <AccordionTrigger>Condition</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="cancer" defaultChecked />
                <Label htmlFor="cancer">Cancer</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="cardiovascular" />
                <Label htmlFor="cardiovascular">Cardiovascular</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="neurological" />
                <Label htmlFor="neurological">Neurological</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="rare-disease" />
                <Label htmlFor="rare-disease">Rare Disease</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="autoimmune" />
                <Label htmlFor="autoimmune">Autoimmune</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="age">
          <AccordionTrigger>Age Group</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="adult" defaultChecked />
                <Label htmlFor="adult">Adult (18-65)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="senior" defaultChecked />
                <Label htmlFor="senior">Senior (65+)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="child" />
                <Label htmlFor="child">Child (2-17)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="infant" />
                <Label htmlFor="infant">Infant (0-23 months)</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="pt-4">
        <Button variant="outline" className="w-full">
          <RefreshCw className="mr-2 h-4 w-4" />
          Reset Filters
        </Button>
      </div>
    </div>
  )
}

