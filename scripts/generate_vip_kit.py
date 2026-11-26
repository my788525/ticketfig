#!/usr/bin/env python3
"""
Generate TicketFig 2026 VIP Written Defense & Discovery Kit deliverables into public/assets/vip/.
Uses python-docx and openpyxl if installed; falls back cleanly to .rtf and .csv.
"""
import os
import csv

OUT_DIR = os.path.join("public", "assets", "vip")
os.makedirs(OUT_DIR, exist_ok=True)


def generate_docx_or_rtf():
    try:
        from docx import Document  # type: ignore

        doc = Document()
        doc.add_heading("TicketFig 2026 Written Defense & Discovery Suite", 0)
        doc.add_paragraph(
            "Template 1: Trial by Written Declaration (CVC § 40902 / ORS § 153.080)\n"
            "Court: [COUNTY SUPERIOR / MUNICIPAL TRAFFIC COURT]\n"
            "Citation No.: [CITATION_NUMBER] · Statute: [STATUTE_CITATION]\n"
            "Date: [YYYY-MM-DD]\n\n"
            "STATEMENT OF FACTS & LEGAL ARGUMENT:\n"
            "I respectfully submit this Trial by Written Declaration pursuant to [STATUTE_CITATION]. "
            "The prosecution bears the burden of proving every element of the alleged violation beyond "
            "a reasonable doubt, including foundational proof of speed-measuring device calibration, "
            "officer certification, and a current Engineering & Traffic Survey (ETS) where required."
        )
        doc.add_heading("Template 2: Radar / LiDAR Calibration Discovery Request", level=1)
        doc.add_paragraph(
            "Pursuant to applicable state discovery rules, Defendant requests:\n"
            "1. Speed-measuring device (Radar/LiDAR) calibration, maintenance, and tuning-fork logs "
            "for 90 days prior and 30 days following the citation date.\n"
            "2. Citing officer's current Radar/LiDAR operator certification.\n"
            "3. Current Engineering & Traffic Survey (ETS) for the cited roadway segment."
        )
        out_path = os.path.join(OUT_DIR, "TicketFig_Written_Defense_Suite_2026.docx")
        doc.save(out_path)
        print(f"[vip] generated {out_path}")
    except ImportError:
        rtf_content = (
            r"{\rtf1\ansi\deff0"
            r"{\b TicketFig 2026 Written Defense & Discovery Suite}\par\par"
            r"Template 1: Trial by Written Declaration (CVC 40902 / ORS 153.080)\par"
            r"Court: [COUNTY TRAFFIC COURT] | Citation: [CITATION_NUMBER]\par"
            r"Template 2: Radar / LiDAR Calibration Discovery Request (90-day logs + ETS).\par"
            r"}"
        )
        out_path = os.path.join(OUT_DIR, "TicketFig_Written_Defense_Suite_2026.rtf")
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(rtf_content)
        print(f"[vip] python-docx not installed; generated fallback {out_path}")


def generate_xlsx_or_csv():
    rows = [
        ["State", "Statute", "Minor_Pts", "Major_Pts", "Minor_Hike_Pct", "Major_Hike_Pct", "Lookback_Months", "Written_Declaration"],
        ["California", "Cal. Veh. Code § 22349 / § 40902", 1, 1, 22, 34, 36, "Yes (TR-205)"],
        ["New York", "N.Y. VTL § 1180 / § 1199 DRA", 4, 6, 20, 35, 36, "No (Appearance / Counsel)"],
        ["North Carolina", "N.C.G.S. § 20-141 / SDIP", 3, 3, 30, 45, 36, "No (PJC / Counsel)"],
        ["Texas", "Tex. Transp. Code § 545.351 / Art. 45.0511", 0, 0, 18, 28, 36, "DSC / Deferred"],
        ["Florida", "Fla. Stat. § 316.183 / § 318.14", 3, 4, 21, 33, 36, "Affidavit / Traffic School"],
    ]
    try:
        import openpyxl  # type: ignore

        wb = openpyxl.Workbook()
        ws = wb.active
        ws.title = "51_State_Statutes_2026"
        for r in rows:
            ws.append(r)

        ws2 = wb.create_sheet("3Yr_ROI_Ledger")
        ws2.append(["Strategy", "Court_Fine_USD", "Traffic_School_USD", "Counsel_Fee_USD", "3Yr_Insurance_Hike_USD", "Total_Expected_Cost"])
        ws2.append(["Pay Ticket Outright", 238, 0, 0, 1650, "=B2+C2+D2+E2"])
        ws2.append(["Traffic School Masking", 238, 65, 0, 0, "=B3+C3+D3+E3"])
        ws2.append(["Written Declaration (45% Win)", 238, 0, 0, 0, "=0.55*(B4+65)"])

        out_path = os.path.join(OUT_DIR, "TicketFig_3Yr_ROI_Ledger_2026.xlsx")
        wb.save(out_path)
        print(f"[vip] generated {out_path}")
    except ImportError:
        out_path = os.path.join(OUT_DIR, "TicketFig_3Yr_ROI_Ledger_2026.csv")
        with open(out_path, "w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerows(rows)
        print(f"[vip] openpyxl not installed; generated fallback {out_path}")


if __name__ == "__main__":
    generate_docx_or_rtf()
    generate_xlsx_or_csv()
