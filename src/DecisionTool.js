import React, { useState } from 'react';

function DecisionTool() {
    const containerStyle = { maxWidth: '800px', margin: 'auto', padding: '20px' };
    const [step, setStep] = useState(1);

    // Step 1 Inputs
    const [fiveYearAverageOn, setFiveYearAverageOn] = useState("");
    const [currentOnPotential, setCurrentOnPotential] = useState("");

    // Step after On stability check
    const [instantOffNeededFromSpreadsheet, setInstantOffNeededFromSpreadsheet] = useState(null);

    // Instant OFF and Base measurements
    const [instantOffPotential, setInstantOffPotential] = useState("");
    const [basePotential, setBasePotential] = useState("");

    const [pipelineProtected, setPipelineProtected] = useState(null);

    const avgOnNum = parseFloat(fiveYearAverageOn);
    const currentOnNum = parseFloat(currentOnPotential);

    const instantOffNum = parseFloat(instantOffPotential);
    const baseNum = parseFloat(basePotential);

    const goNext = () => setStep(step + 1);
    const goBack = () => setStep(step - 1);

    const finalize = (isProtected) => {
        setPipelineProtected(isProtected);
        setStep(6); // Show final results at step 6
    };

    const resetForNextReading = () => {
        setStep(1);
        setFiveYearAverageOn("");
        setCurrentOnPotential("");
        setInstantOffNeededFromSpreadsheet(null);
        setInstantOffPotential("");
        setBasePotential("");
        setPipelineProtected(null);
    };

    // Determine if On stable (±200 mV)
    let onStable = false;
    if (!isNaN(avgOnNum) && !isNaN(currentOnNum)) {
        const diff = Math.abs(currentOnNum - avgOnNum);
        onStable = diff <= 200;
    }

    return (
        <div style={containerStyle}>
            <h2 style={{ textAlign: 'center' }}>CP Pipe-to-Soil Troubleshooting Decision Tool</h2>

            {step === 1 && (
                <div>
                    <h3>Step 1: 'On' Potential Measurements</h3>
                    <p>
                        Enter the 5-year average 'On' potential and the current year's 'On' potential.
                        If this year's 'On' is within ±200 mV of the average:
                        - If spreadsheet does not require Instant OFF → pipeline protected.
                        - If spreadsheet requires Instant OFF → measure Instant OFF.
                    </p>
                    <p>
                        If not within ±200 mV, proceed directly to Instant OFF measurement regardless of spreadsheet instructions.
                    </p>
                    <p><strong>5-Year Average 'On' (mV):</strong></p>
                    <input
                        type="number"
                        value={fiveYearAverageOn}
                        onChange={(e) => setFiveYearAverageOn(e.target.value)}
                        placeholder="e.g. -860"
                    />
                    <p><strong>Current Year's 'On' (mV):</strong></p>
                    <input
                        type="number"
                        value={currentOnPotential}
                        onChange={(e) => setCurrentOnPotential(e.target.value)}
                        placeholder="e.g. -865"
                    />
                    <br /><br />
                    <button onClick={() => {
                        if (fiveYearAverageOn !== "" && currentOnPotential !== "") {
                            if (onStable) {
                                // On stable, need to check spreadsheet for OFF requirement
                                goNext();
                            } else {
                                // On not stable, go directly to Instant OFF step
                                // We skip spreadsheet check because we must take Instant OFF anyway
                                setInstantOffNeededFromSpreadsheet(true); // For the logic flow, treat as needed
                                setStep(3);
                            }
                        }
                    }}>Next</button>
                </div>
            )}

            {step === 2 && onStable && (
                <div>
                    <h3>'On' Potential is Stable</h3>
                    <p>
                        The 'On' potential is within ±200 mV of the average. If the spreadsheet does not require Instant OFF,
                        the pipeline is protected. If it does, we proceed to measure Instant OFF.
                    </p>
                    <p>Does the spreadsheet indicate Instant OFF is needed?</p>
                    <button onClick={() => { setInstantOffNeededFromSpreadsheet(true); setStep(3); }}>Yes</button>
                    <button onClick={() => { finalize(true); }}>No</button>
                    <button onClick={goBack}>Back</button>
                </div>
            )}

            {step === 3 && instantOffNeededFromSpreadsheet === true && (
                <div>
                    <h3>Measure 'Instant OFF' Potential</h3>
                    <p>
                        Enter the Instant OFF potential. If Instant OFF ≤ -850 mV, pipeline is protected.
                        Otherwise, proceed to Base potential.
                    </p>
                    <input
                        type="number"
                        value={instantOffPotential}
                        onChange={(e) => setInstantOffPotential(e.target.value)}
                        placeholder="e.g., -860"
                    />
                    <br /><br />
                    <button onClick={() => {
                        if (instantOffPotential !== "") {
                            const val = parseFloat(instantOffPotential);
                            if (!isNaN(val) && val <= -850) {
                                finalize(true);
                            } else {
                                // Need base potential measurement
                                goNext();
                            }
                        }
                    }}>Next</button>
                    <button onClick={goBack}>Back</button>
                </div>
            )}

            {step === 4 && (
                <div>
                    <h3>Measure 'Base' Potential</h3>
                    <p>
                        The Instant OFF was less negative than -850 mV. Now measure the Base potential.
                        If the Base is ≥ -100 mV more negative than Instant Off, pipeline is protected. Otherwise, not protected.
                    </p>
                    <input
                        type="number"
                        value={basePotential}
                        onChange={(e) => setBasePotential(e.target.value)}
                        placeholder="e.g., -750"
                    />
                    <br /><br />
                    <button onClick={() => {
                        if (basePotential !== "") {
                            if (!isNaN(instantOffNum) && !isNaN(baseNum) && (baseNum - instantOffNum) >= 100) {
                                finalize(true);
                            } else {
                                finalize(false);
                            }
                        }
                    }}>Evaluate &amp; Finalize</button>
                    <button onClick={goBack}>Back</button>
                </div>
            )}

            {step === 6 && (
                <div>
                    <h3>Final Evaluation</h3>
                    {pipelineProtected === true && (
                        <p style={{ color: 'green', fontWeight: 'bold' }}>
                            Pipeline is considered protected.
                        </p>
                    )}
                    {pipelineProtected === false && (
                        <div>
                            <p style={{ color: 'red', fontWeight: 'bold' }}>
                                Pipeline is not considered protected.
                            </p>
                            <p>Investigate and rectify issues.</p>
                        </div>
                    )}
                    {pipelineProtected === null && (
                        <p>Please ensure all inputs were provided correctly.</p>
                    )}
                    <button onClick={resetForNextReading} style={{ backgroundColor: '#4CAF50', color: '#fff' }}>
                        Next Reading
                    </button>
                </div>
            )}
        </div>
    );
}

export default DecisionTool;
