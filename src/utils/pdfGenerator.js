import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDF = async (analysis, userData) => {
  try {
    // Create new PDF document
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    let yPosition = 20;

    // Colors
    const primaryColor = [15, 160, 160]; // emerald
    const secondaryColor = [59, 130, 246]; // blue
    const textColor = [255, 255, 255];
    const bgDark = [23, 37, 84]; // blue-950

    // Add background
    pdf.setFillColor(...bgDark);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

    // Header with gradient effect
    pdf.setFillColor(...secondaryColor);
    pdf.rect(0, 0, pageWidth, 40, 'F');
    pdf.setFillColor(...primaryColor);
    pdf.rect(0, 35, pageWidth, 5, 'F');

    // Logo/Title
    pdf.setFontSize(28);
    pdf.setTextColor(...textColor);
    pdf.setFont('helvetica', 'bold');
    pdf.text('HairCare AI', 15, 20);
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Hair Health Analysis Report', 15, 28);

    // Date
    pdf.setFontSize(10);
    const date = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    pdf.text(`Generated: ${date}`, pageWidth - 15, 28, { align: 'right' });

    yPosition = 50;

    // Patient Information Box
    pdf.setFillColor(30, 41, 59); // slate-800
    pdf.roundedRect(15, yPosition, pageWidth - 30, 35, 3, 3, 'F');
    
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...primaryColor);
    pdf.text('Patient Information', 20, yPosition + 8);

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(200, 200, 200);
    pdf.text(`Name: ${userData?.basicInfo?.fullName || 'N/A'}`, 20, yPosition + 16);
    pdf.text(`Age: ${userData?.basicInfo?.age || 'N/A'} years`, 20, yPosition + 22);
    pdf.text(`Gender: ${userData?.basicInfo?.gender || 'N/A'}`, 20, yPosition + 28);
    pdf.text(`BMI: ${analysis.bmi}`, pageWidth - 60, yPosition + 16);
    pdf.text(`Risk Score: ${analysis.riskScore}`, pageWidth - 60, yPosition + 22);

    yPosition += 45;

    // Key Insights Section
    pdf.setFillColor(30, 41, 59);
    pdf.roundedRect(15, yPosition, pageWidth - 30, 45, 3, 3, 'F');
    
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...primaryColor);
    pdf.text('Key Insights', 20, yPosition + 8);

    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(200, 200, 200);
    
    const insights = [
      `Primary Issue: ${analysis.insights.primaryIssue}`,
      `Key Finding: ${analysis.insights.keyFinding}`,
      `Confidence Level: ${analysis.insights.confidence}`,
      `Success Probability: ${analysis.insights.successProbability}`,
      `Expected Timeline: ${analysis.insights.expectedTimeframe}`
    ];

    insights.forEach((insight, index) => {
      pdf.text(insight, 20, yPosition + 16 + (index * 6), { maxWidth: pageWidth - 40 });
    });

    yPosition += 55;

    // Root Causes Section
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...primaryColor);
    pdf.text('Identified Root Causes', 15, yPosition);
    yPosition += 8;

    analysis.rootCauses.forEach((cause, index) => {
      if (yPosition > pageHeight - 30) {
        pdf.addPage();
        pdf.setFillColor(...bgDark);
        pdf.rect(0, 0, pageWidth, pageHeight, 'F');
        yPosition = 20;
      }

      // Cause box
      pdf.setFillColor(30, 41, 59);
      pdf.roundedRect(15, yPosition, pageWidth - 30, 22, 3, 3, 'F');

      // Priority badge
      const priorityColors = {
        'critical': [239, 68, 68], // red
        'high': [251, 191, 36], // amber
        'medium': [59, 130, 246] // blue
      };
      pdf.setFillColor(...(priorityColors[cause.priority] || priorityColors.medium));
      pdf.roundedRect(pageWidth - 45, yPosition + 3, 25, 6, 2, 2, 'F');
      pdf.setFontSize(7);
      pdf.setTextColor(255, 255, 255);
      pdf.text(cause.priority.toUpperCase(), pageWidth - 32.5, yPosition + 7, { align: 'center' });

      // Cause details
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(...textColor);
      pdf.text(`${index + 1}. ${cause.cause}`, 20, yPosition + 8);

      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(180, 180, 180);
      pdf.text(cause.description, 20, yPosition + 14, { maxWidth: pageWidth - 50 });

      pdf.setTextColor(...primaryColor);
      pdf.text(`Confidence: ${cause.confidence}%`, 20, yPosition + 19);

      yPosition += 26;
    });

    // New page for recommendations
    pdf.addPage();
    pdf.setFillColor(...bgDark);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');
    yPosition = 20;

    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...primaryColor);
    pdf.text('Personalized Recommendations', 15, yPosition);
    yPosition += 10;

    analysis.recommendations.slice(0, 4).forEach((rec, index) => {
      if (yPosition > pageHeight - 50) {
        pdf.addPage();
        pdf.setFillColor(...bgDark);
        pdf.rect(0, 0, pageWidth, pageHeight, 'F');
        yPosition = 20;
      }

      // Category badge
      pdf.setFillColor(...primaryColor);
      pdf.roundedRect(15, yPosition, 40, 6, 2, 2, 'F');
      pdf.setFontSize(8);
      pdf.setTextColor(255, 255, 255);
      pdf.text(rec.category, 35, yPosition + 4, { align: 'center' });

      yPosition += 10;

      // Title
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(...textColor);
      pdf.text(rec.title, 15, yPosition);
      yPosition += 6;

      // Description
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(200, 200, 200);
      const descLines = pdf.splitTextToSize(rec.description, pageWidth - 30);
      pdf.text(descLines, 15, yPosition);
      yPosition += descLines.length * 5 + 4;

      // Action items
      if (rec.actionItems && rec.actionItems.length > 0) {
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(...primaryColor);
        pdf.text('Action Items:', 15, yPosition);
        yPosition += 5;

        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(180, 180, 180);
        rec.actionItems.slice(0, 3).forEach((item) => {
          const itemLines = pdf.splitTextToSize(`• ${item}`, pageWidth - 35);
          pdf.text(itemLines, 18, yPosition);
          yPosition += itemLines.length * 4;
        });
      }

      yPosition += 8;
    });

    // Footer on last page
    pdf.setFontSize(8);
    pdf.setTextColor(100, 100, 100);
    pdf.text('This report is for informational purposes only and does not constitute medical advice.', pageWidth / 2, pageHeight - 15, { align: 'center' });
    pdf.text('Please consult with a healthcare professional for personalized treatment.', pageWidth / 2, pageHeight - 10, { align: 'center' });
    pdf.setTextColor(...primaryColor);
    pdf.text('© 2026 HairCare AI. All rights reserved.', pageWidth / 2, pageHeight - 5, { align: 'center' });

    // Save PDF
    const fileName = `HairCare-AI-Report-${date.replace(/ /g, '-')}.pdf`;
    pdf.save(fileName);

    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

// Alternative: Generate PDF from HTML element
export const generatePDFFromHTML = async (elementId) => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#0f172a'
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    
    const fileName = `HairCare-AI-Report-${new Date().toLocaleDateString()}.pdf`;
    pdf.save(fileName);

    return true;
  } catch (error) {
    console.error('Error generating PDF from HTML:', error);
    throw error;
  }
};