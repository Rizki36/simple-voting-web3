# Simple Voting Web3

## Tech Stack

- Bun
- Typescript
- React
- Wagmi
- Tailwind
- Shadcn
- Tanstack router
- Tanstack query
- Tanstack table
- Appkit

## Features

### Wallet Connection

The Wallet Connection feature enables users to authenticate with the application using their Web3 wallet (primarily MetaMask). This serves as the primary authentication method for the platform.

**Functional Requirements:**
- Users must be able to connect their MetaMask wallet to the application
- The application should display the connected wallet address in a truncated format (e.g., 0x1234...5678)
- Users should be able to disconnect their wallet
- The connection state should persist across browser refreshes
- Application should handle connection errors gracefully

**Technical Implementation:**
- Utilize the Wagmi library to interact with Ethereum wallets
- Support Ethereum mainnet and common testnets (Sepolia, Goerli)
- Implement a connection button in the header/navbar
- Store connection state in local storage for persistence
- Display wallet balance alongside the address

**User Flow:**
1. User visits the application
2. User clicks "Connect Wallet" button
3. MetaMask popup appears requesting connection
4. Upon approval, user is authenticated and can access voting features
5. User can disconnect at any time via a dropdown menu

**Security Considerations:**
- Implement signature verification for sensitive operations
- Don't store private keys or sensitive wallet information
- Use ENS resolution where applicable to display human-readable names

### Create Proposal

The Create Proposal feature enables authorized users (admin/deployer) to create new voting proposals for the community. Each proposal contains necessary details and voting options for participants to consider.

**Functional Requirements:**
- Only authorized users (admin or deployer) can create new proposals
- Each proposal must include a title, detailed description, and a list of voting options
- Proposals should have configurable voting duration
- Form validation to ensure all required information is provided
- Preview functionality before final submission
- Confirmation upon successful proposal creation

**Technical Implementation:**
- Build a form interface using Shadcn components for data input
- Integrate with smart contract's `createProposal` function via Wagmi
- Implement role-based access control to restrict proposal creation
- Store proposal data on-chain with proper gas optimization
- Use TanStack Query for managing the submission state and responses
- Handle transaction confirmation and error states appropriately

**User Flow:**
1. Admin navigates to the "Create Proposal" page
2. System verifies user has appropriate permissions
3. Admin fills out the proposal form with title, description, and voting options
4. Admin configures additional settings if needed
5. Admin previews the proposal before submission
6. Upon confirmation, admin submits the proposal to the blockchain
7. System displays transaction status and confirmation when complete

**Security Considerations:**
- Verify admin permissions through smart contract role checks
- Implement input sanitization to prevent injection attacks
- Require transaction signing with connected wallet
- Provide clear transaction preview before submission
- Rate limit proposal creation to prevent spam

### View Proposal List

The View Proposal List feature allows users to browse all active and past proposals in the system. This provides a central hub for users to discover voting opportunities and check the status of existing proposals.

**Functional Requirements:**
- Display all active proposals retrieved from the smart contract
- Show basic information for each proposal (title, description preview, voting status)
- Allow users to filter proposals by status (active, ended, all)
- Implement pagination or infinite scrolling for efficient browsing
- Enable sorting by various criteria (creation date, end date, participation count)
- Provide search functionality to find specific proposals

**Technical Implementation:**
- Use TanStack Query to fetch and cache proposal data from the blockchain
- Implement TanStack Table for sortable, filterable proposal display
- Create responsive card or list layouts using Tailwind and Shadcn components
- Design skeleton loading states for improved user experience
- Implement proper error handling for blockchain connectivity issues

**User Flow:**
1. User navigates to the proposals page or home page
2. System fetches active proposals from the blockchain
3. Proposals are displayed in a card/list format with key information
4. User can filter, sort, or search for specific proposals
5. User clicks on a proposal to view its details and participate in voting

**Security Considerations:**
- Implement proper data validation for all proposal information
- Ensure read operations cannot modify blockchain state
- Consider implementing a caching layer to reduce blockchain calls
- Handle potential smart contract errors gracefully

### Vote on Proposal

The Vote on Proposal feature allows authenticated users to cast their vote on active proposals by selecting one of the available options. This is the core interaction that enables community decision-making within the platform.

**Functional Requirements:**
- Users must be connected with their wallet to vote
- Users can select and submit a single option per proposal
- Each wallet address can only vote once per proposal
- Users should see their vote status (whether they have already voted)
- The application should clearly display voting options with descriptive labels
- Users should receive confirmation when their vote is recorded
- Votes should be immutable once cast

**Technical Implementation:**
- Integrate with the smart contract's `vote(uint proposalId, uint optionIndex)` function via Wagmi
- Check if the user has already voted before allowing submission
- Implement optimistic UI updates with proper loading and error states
- Use TanStack Query for managing the submission state and revalidating data
- Display real-time transaction status during the voting process
- Update the UI to reflect the new vote count after submission

**User Flow:**
1. User navigates to a specific proposal's details page
2. System checks if the user has already voted on this proposal
3. If not voted, user is presented with voting options
4. User selects their preferred option
5. User confirms their selection
6. System sends the transaction to the blockchain
7. User receives feedback on transaction status
8. Upon success, the UI updates to show the user's vote and updated results

**Security Considerations:**
- Prevent double-voting through smart contract restrictions
- Implement proper error handling for rejected transactions
- Ensure transaction parameters are correctly formatted and validated
- Consider gas optimization for the voting transaction
- Protect against front-running attacks in competitive voting scenarios

### Display Voting Results

The Display Voting Results feature provides visual representations of voting data, allowing users to quickly understand the current state and trends of active proposals.

**Functional Requirements:**
- Display real-time voting results using visual charts (primarily bar charts)
- Show the number and percentage of votes for each option
- Include the total number of participants who have voted
- Automatically update results as new votes come in
- Enable users to share results via social media or direct links

**Technical Implementation:**
- Use Recharts library for creating responsive and interactive charts
- Implement TanStack Query's polling mechanism to fetch updated results at regular intervals
- Create color-coded visualizations for quick readability
- Implement responsive design for charts across different device sizes
- Use skeleton loading states while data is being fetched
- Provide fallback text representation of data for accessibility

**User Flow:**
1. User views a proposal's details page
2. System fetches the current voting results from the blockchain
3. Results are displayed in visual chart format (bar charts)
4. Charts automatically update at regular intervals (polling)
5. User can see their own vote highlighted if they've participated
6. For completed proposals, final results are displayed with outcome highlighted

**Security Considerations:**
- Ensure read-only operations when displaying results
- Validate data integrity by comparing with blockchain state
- Implement proper error handling for network or contract issues
- Consider caching strategies to reduce blockchain calls
- Ensure visualization accurately represents on-chain data without manipulation

### Restrict Re-voting

The Restrict Re-voting feature ensures the integrity of the voting process by preventing users from casting multiple votes on the same proposal, maintaining a one-address-one-vote principle.

**Functional Requirements:**
- Prevent users from voting more than once on the same proposal
- Display clear indicators when a user has already voted
- Disable voting UI elements for proposals the user has already participated in
- Show which option the user previously selected
- Provide clear feedback when attempting to vote again

**Technical Implementation:**
- Implement a mapping in the smart contract to track voter participation: `mapping(uint256 => mapping(address => bool)) public hasVoted`
- Add a modifier or check in the vote function to verify user hasn't voted already
- Query the mapping to determine UI state (enabled/disabled voting buttons)
- Cache voting status for each proposal in local storage to reduce blockchain calls
- Use TanStack Query to manage the voting state and invalidation

**User Flow:**
1. User navigates to a proposal's details page
2. System checks if user's address exists in the proposal's voters mapping
3. If user has already voted, voting options are displayed as disabled
4. User's previously selected option is highlighted
5. If user attempts to vote again, a message indicates they've already participated
6. User can still view voting results even after voting

**Security Considerations:**
- Ensure the voting restriction is enforced at the contract level, not just UI
- Implement proper error handling when a transaction is rejected due to previous voting
- Protect against potential attempts to bypass restrictions through contract interactions
- Consider using events to track voting activity for better monitoring
- Ensure proper validation of voter addresses to prevent spoofing

### End Voting

The End Voting feature enables administrators to manually conclude voting periods for proposals, finalize results, and transition proposals to a completed state.

**Functional Requirements:**
- Only authorized users (admin/deployer) can end voting periods
- Proposals are clearly marked as "Closed" once voting ends
- No further votes can be cast on closed proposals
- Final results are permanently recorded and displayed
- Notification to users that a proposal voting period has ended
- Display of final outcome based on voting results

**Technical Implementation:**
- Integrate with smart contract's `endProposal(uint proposalId)` function via Wagmi
- Implement role-based access control to restrict ending proposals
- Update proposal status in UI to reflect closed state
- Use TanStack Query to invalidate and refresh data after a proposal is closed
- Implement clear visual indicators for closed proposals across the application
- Archive closed proposals while maintaining accessibility

**User Flow:**
1. Admin navigates to an active proposal's details page
2. Admin sees an "End Voting" button (only visible to admins)
3. Upon clicking, admin is asked to confirm the action
4. System sends transaction to blockchain to end the voting period
5. UI updates to show the proposal as "Closed"
6. Final voting results are displayed with a clear indication of the outcome
7. Users viewing the proposal see it marked as completed with final results

**Security Considerations:**
- Verify admin permissions through smart contract role checks before allowing ending
- Implement proper event logging for audit purposes
- Ensure the end voting function cannot be called multiple times on the same proposal
- Prevent race conditions where votes might be cast simultaneously with ending
- Consider implementing a time-lock or cooldown period before results are finalized
- Ensure transaction signing for ending proposals to prevent unauthorized closures

### Auto-End Voting

The Auto-End Voting feature enables proposals to automatically conclude once they reach their predefined end time, without requiring manual intervention from administrators.

**Functional Requirements:**
- Allow setting an end date/time when creating a proposal
- Automatically transition proposals to "Closed" state when the end time is reached
- Prevent voting on expired proposals
- Display countdown timer for active proposals
- Show time remaining in a user-friendly format (days, hours, minutes)
- Notify users when a proposal is nearing its end time

**Technical Implementation:**
- Store proposal end timestamp in the smart contract
- Implement a timestamp check in the vote function to prevent voting on expired proposals
- Use smart contract time-based conditions or an off-chain service for auto-closing
- Create a UI component to display time remaining with dynamic updates
- Set up polling or webhook mechanisms to detect and handle expired proposals
- Implement proper UI state changes when a proposal automatically ends

**User Flow:**
1. Admin sets an end date/time when creating a proposal
2. Users see the remaining time displayed on the proposal details page
3. As time passes, the countdown updates automatically
4. When end time is reached, the proposal is marked as "Closed"
5. Voting options are disabled automatically
6. Final results are displayed with outcome highlighted
7. Users can no longer submit votes for the ended proposal

**Security Considerations:**
- Use blockchain timestamps to determine proposal end time
- Implement safeguards against timestamp manipulation
- Ensure consistent time handling across different timezones
- Create fallback mechanisms in case automatic ending fails
- Monitor for edge cases around proposal ending periods
- Set up alerts for admins if auto-ending encounters issues

### User Dashboard

The User Dashboard feature provides users with a personalized space to view their voting activity, track proposals they've participated in, and manage their account settings.

**Functional Requirements:**
- Display a summary of user's voting activity (proposals voted on, created)
- Show a list of proposals the user has participated in
- Allow filtering of personal voting history (active, ended, all)
- Provide quick access to proposals requiring user's attention
- Display user's wallet information and connection status
- Enable users to view their voting power and any special permissions

**Technical Implementation:**
- Create a dedicated dashboard route using TanStack Router
- Implement fetching of user-specific data using wallet address as identifier
- Use TanStack Query for efficient data loading and caching of user data
- Build responsive UI components with Shadcn and Tailwind
- Implement local storage for persisting user preferences
- Create optimized queries to fetch only user-relevant proposal data

**User Flow:**
1. User connects their wallet to the application
2. User navigates to the "Dashboard" section
3. System loads personalized data related to the connected wallet
4. User can view their voting history and filter by different criteria
5. User can quickly access proposals they've created or participated in
6. System highlights any proposals requiring attention (new, ending soon)

**Security Considerations:**
- Ensure dashboard data is properly scoped to the connected wallet
- Implement proper authentication checks before displaying sensitive information
- Consider privacy implications when displaying user voting history
- Use read-only operations for data display to prevent accidental transactions
- Validate all user-specific data comes from trusted blockchain sources
- Consider allowing users to hide their activity if privacy is a concern