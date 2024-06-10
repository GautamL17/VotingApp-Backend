const Candidate = require('../models/candidate.models.js');
const { jwtGenerate } = require('../utils/jwtAuth.js');
const User = require('../models/user.models.js');
const comparePassword = require('../models/user.models.js');

const checkAdminRole = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            console.log('User not found');
            return false;
        }
        if (user.role === 'admin') {
            console.log('User is admin');
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error checking admin role:', error);
        return false;
    }
};

const HandleSignUp = async (req, res, next) => {
    try {
        const userId = req.user.id
        console.log(userId)
        console.log(req.user);
        const isAdmin = checkAdminRole(userId)
        if (!await isAdmin) {
            return res.status(403).json({ message: 'User cannot access admin roles' });
        }
        const data = req.body;
        const candidate = new Candidate(data);
        const response = await candidate.save();
        console.log('Data saved');
        res.status(200).json({ response: response });
    } catch (e) {
        console.error('Error in HandleSignUp:', e);
        res.status(500).json({ response: 'Internal server error' });
    } finally {
        next();
    }
};

const HandleCandidateId = async (req, res, next) => {
    try {
        const userId = req.user.id

        const isAdmin = checkAdminRole(userId)
        if (!await isAdmin) {
            return res.status(403).json({ message: 'User does not have access to admin roles' });
        }
        // console.log('data reached 1')
        const candidateId = req.params.candidateId;
        // console.log(candidateId)
        const updatedCandidateData = req.body;
        // console.log(updatedCandidateData)
        const response = await Candidate.findByIdAndUpdate(candidateId, updatedCandidateData);
        // console.log(response)
        if (!response) return res.status(404).json({ error: 'Candidate not found' });
        res.status(200).json({ message: 'Candidate data updated' });
    } catch (error) {
        console.error('Error in HandleCandidateId:', error);
        res.status(500).json({ response: 'Internal server error' });
    } finally {
        next();
    }
};

const HandleCandidateDelete = async (req, res, next) => {
    try {
        const userId = req.user.id

        const isAdmin = checkAdminRole(userId)
        if (!await isAdmin) {
            console.log('Admin role not found');
            return res.status(403).json({ message: 'User does not have access to admin roles' });
        }
        const candidateId = req.params.candidateId;
        const response = await Candidate.findByIdAndDelete(candidateId);
        if (!response) return res.status(404).json({ error: 'Candidate not found' });
        console.log('Candidate deleted');
        res.status(200).json({ message: 'Candidate data deleted' });
    } catch (error) {
        console.error('Error in HandleCandidateDelete:', error);
        res.status(500).json({ response: 'Internal server error' });
    } finally {
        next();
    }
};

// const HandleVotes = async(req,res,next) => {
//     try {
//         const candidateId = req.params.candidateId;
//         console.log(candidateId);
//         const userId = req.user.id;
//         console.log(userId);
//         const candidate = await Candidate.findById(candidateId)
//         console.log(candidate);
//         if(!candidate){
//             return res.status(404).json({error:'candidate not found'})
//         }

//         const user = await User.findById(userId)
//         if(!user){
//             return res.status(404).json({message:'user not found'})
//         }

//         if(user.isVoted){
//             res.status(400).json({message:'you have already voted'})
//         }
//         if(user.role === 'admin'){
//             res.status(403).json({message:'admin is not allowed'})
//         }

//         candidate.votes.push({user:userId})
//         candidate.voteCount++
//         await candidate.save()

//         user.isVoted = true 
//         await user.save()

//         res.status(200).json({ message:'vote recorded successfully' })

//     } catch (error) {
//         console.log("ZXcfghjkkhrdxc");
//         res.status(500).json({ response: 'Internal server error' });
//         return
//     }
//     finally{
//         next()
//     }
// }


const HandleVotes = async (req, res, next) => {
    try {
        const candidateId = req.params.candidateId;
        console.log(candidateId);
        const userId = req.user.id;
        console.log(userId);

        const candidate = await Candidate.findById(candidateId);
        console.log(candidate);
        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.isVoted) {
            return res.status(400).json({ message: 'You have already voted' });
        }

        if (user.role === 'admin') {
            return res.status(403).json({ message: 'Admin is not allowed to vote' });
        }

        candidate.votes.push({ user: userId });
        candidate.voteCount++;
        await candidate.save();

        user.isVoted = true;
        await user.save();

        res.status(200).json({ message: 'Vote recorded successfully' });
    } catch (error) {
        console.error('Error in HandleVotes:', error);
        res.status(500).json({ response: 'Internal server error' });
    } finally {
        next();
    }
};



const HandleCountVotes = async (req, res, next) => {
    try {

        const candidate = await Candidate.find().sort({ voteCount: 'desc' })

        const voteRecord = candidate.map((data) => {
            return {
                party: data.party,
                count: data.voteCount,
            }
        })
        return res.status(200).json({ voteRecord })

    } catch (error) {
        console.log('sdvbkkjhgf');
        res.status(500).json({ response: 'Internal server error' });
    } finally {
        next()
    }
}


const HandleCandidateList = async (req, res) => {
    try {
        const candidate = await Candidate.find({}, 'name party - _id')
        console.log('candidate:',candidate)
        if (!candidate) return res.status(500).json({ message: 'no candidate' })

        return res.status(200).json(candidate)
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    HandleSignUp,
    HandleCandidateId,
    HandleCandidateDelete,
    HandleVotes,
    HandleCountVotes,
    HandleCandidateList,
};
