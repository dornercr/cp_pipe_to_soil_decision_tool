import React from 'react';
import potential_measure from './potential_measure.png'; //

function Introduction({ onStartTool }) {
    const containerStyle = { maxWidth: '800px', margin: 'auto', padding: '20px' };
    const headingStyle = { textAlign: 'center' };

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>Cathodic Protection Potential Surveys Study Guide</h1>
            <h3 style={headingStyle}>By: Charles Dorner</h3>

            <h2>Introduction</h2>
            <p>
                This study guide outlines the procedures and criteria for conducting cathodic protection (CP)
                potential surveys on pipelines. Following these procedures helps ensure the structural integrity
                and longevity of pipeline infrastructure.
            </p>
            <p>
                <img src={potential_measure} alt="Descriptive alt text" style={{maxWidth: '500px', display: 'block', margin: '20px auto' }}/>
            </p>

            {/* Add the button here under the image */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <button
                    style={{margin: '10px', padding: '10px 20px', cursor: 'pointer', fontSize: '16px'}}
                    onClick={onStartTool}
                >
                    Start Decision Tool
                </button>
            </div>

            <h2>Annual CP Survey Procedures</h2>
            <ol>
                <li>
                    <strong>Start the Annual CP Survey:</strong><br />
                    Measure DC pipe-to-soil potential at all test stations and rectifiers.
                </li>
                <li>
                    <strong>Measure ‘On’ Potentials:</strong><br />
                    With the rectifier current on, measure potentials at each station.<br />
                    If the 'On' potential differs by ±200 mV from the average of the last five readings, or
                    if (On potential - IR drop) &lt; -0.85 V, or if indicated by the spreadsheet,
                    collect ‘Instant OFF/Polarized’ potentials.
                </li>
                <li>
                    <strong>Collect ‘Instant OFF/Polarized’ Potentials:</strong><br />
                    Check if ‘Instant off’ potential ≥ -850 mV.
                    If not, obtain ‘Base’ potential.
                </li>
                <li>
                    <strong>Evaluate ‘Base’ Potential:</strong><br />
                    If ‘Base’ is ≥ -100 mV more negative than ‘Instant off,’ pipeline is protected.
                </li>
                <li>
                    <strong>Determine Protection Status:</strong><br />
                    If ‘Instant off’ ≥ -850 mV or ‘Base’ meets criteria, pipeline is protected.
                    Otherwise, further action is required.
                </li>
            </ol>

            <h2>Criteria for Considering a Pipeline Protected</h2>
            <ul>
                <li>‘Instant off’ potential ≥ -850 mV.</li>
                <li>‘Native’ or ‘Depolarized’ potential ≥ 100 mV more negative than ‘Instant off’.</li>
                <li>‘On’ potential within ±200 mV of the average, indicating stability.</li>
            </ul>

            <h2>Additional Notes</h2>
            <p>
                Use potential measurements to verify insulating joints, casing insulators, electrical continuity,
                and absence of stray currents. Adjust rectifier outputs as necessary. Determine anode current
                by measuring voltage drop across shunts.
            </p>

            <h2>Conclusion</h2>
            <p>
                Regular CP surveys are essential for maintenance and corrosion prevention.
                This guide helps ensure correct procedures, standards compliance, and pipeline protection.
            </p>
            <p><em>Refer to the troubleshooting decision tool above.</em></p>
        </div>
    );
}

export default Introduction;
